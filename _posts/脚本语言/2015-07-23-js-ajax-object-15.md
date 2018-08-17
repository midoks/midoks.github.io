---
layout: post
title: ajax原理和XmlHttpRequest对象
tag: ['ajax原理和XmlHttpRequest对象', 'javascript']
category: ['脚本语言']
a_id: 15
---

Ajax的原理简单来说通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用javascript来操作DOM而更新页面。
这其中最关键的一步就是从服务器获得请求数据。要清楚这个过程和原理，我们必须对 XMLHttpRequest有所了解。

XMLHttpRequest是ajax的核心机制，它是在IE5中首先引入的，是一种支持异步请求的技术。
简单的说，也就是javascript可以及时向服务器提出请求和处理响应，而不阻塞用户。达到无刷新的效果。

所以我们先从XMLHttpRequest讲起，来看看它的工作原理。

首先，我们先来看看XMLHttpRequest这个对象的属性。

它的属性有：
```
onreadystatechange  每次状态改变所触发事件的事件处理程序。
responseText     从服务器进程返回数据的字符串形式。
responseXML    从服务器进程返回的DOM兼容的文档数据对象。
status           从服务器返回的数字代码，比如常见的404（未找到）和200（已就绪）
status Text       伴随状态码的字符串信息
readyState       对象状态值

0 (未初始化) 对象已建立，但是尚未初始化（尚未调用open方法）
1 (初始化) 对象已建立，尚未调用send方法
2 (发送数据) send方法已调用，但是当前的状态及http头未知
3 (数据传送中) 已接收部分数据，因为响应及http头不全，这时通过responseBody和responseText获取部分数据会出现错误，
4 (完成) 数据接收完毕,此时可以通过通过responseXml和responseText获取完整的回应数据

但是，由于各浏览器之间存在差异，所以创建一个XMLHttpRequest对象可能需要不同的方法。这个差异主要体现在IE和其它浏览器之间。下面是一个比较标准的创建XMLHttpRequest对象的方法。
```

```
function CreateXmlHttp() { //非IE浏览器创建XmlHttpRequest对象 
    if(window.XmlHttpRequest) {
        xmlhttp = new XmlHttpRequest();
    } //IE浏览器创建XmlHttpRequest对象 
    if (window.ActiveXObject) { 
        try{
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }catch(e){ 
            try {
                xmlhttp = new ActiveXObject("msxml2.XMLHTTP");
            }catch (ex){}
        }
    }
} 
function midoks_ajax() { 
    var data=document.getElementById("username").value;
    CreateXmlHttp(); 
    if (!xmlhttp){
        alert("创建xmlhttp对象异常！"); 
        return false;
    }
    xmlhttp.open("POST", url, false);
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4){
            document.getElementById("user1").innerHTML = "数据正在加载..."; 
            if(xmlhttp.status == 200){
                document.write(xmlhttp.responseText);
             }
        }
    }
    xmlhttp.send();
}
```

如上所示，函数首先检查XMLHttpRequest的整体状态并且保证它已经完成（readyStatus=4），即数据已经发送完毕。然后根据服务器的设定询问请求状态，如果一切已经就绪（status=200），那么就执行下面需要的操作。

对于XmlHttpRequest的两个方法，open和send，其中open方法指定了：
```
a、向服务器提交数据的类型，即post还是get。
b、请求的url地址和传递的参数。
c、传输方式，false为同步，true为异步。默认为true。如果是异步通信方式(true)，客户机就不等待服务器的响应；如果是同步方式(false)，客户机就要等到服务器返回消息后才去执行其他操作。我们需要根据实际需要来指定同步方式，在某些页面中，可能会发出多个请求，甚至是有组织有计划有队形大规模的高强度的request，而后一个是会覆盖前一个的，这个时候当然要指定同步方式。
```
Send方法用来发送请求。