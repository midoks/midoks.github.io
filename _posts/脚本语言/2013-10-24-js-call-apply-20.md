---
layout: post
title: JavaScript的call和apply使用
tag: ['javascript']
category: ['脚本语言']
a_id: 20
---

Function.protype.call
函数意义:调用一个对象的一个方法，以另一个对象替换当前对象。
函数语法:call([thisObj[,arg1[, arg2[, [,.argN]]]]])


参数:thisObj 
可选项。将被用作当前对象的对象。 
arg1, arg2, , argN 
可选项。将被传递方法参数序列。 
说明 
call 方法可以用来代替另一个对象调用一个方法。call 方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象。 
如果没有提供 thisObj 参数，那么 Global 对象被用作 thisObj。

举个例子:
```
function add(a,b) { 
    console.log(a+b); 
}
function sub(a,b) { 
    console.log(a-b); 
}
add.call(sub,3,1);
```
结果为:4,意味add方法代替了sub方法。

在举个例子:
```
function dog(){ 
    this.name = "排骨"; 
    this.eat = function(){
        console.log(this.name); 
    } 
}
function cat(){
    this.name = "鱼";
}
var d= new dog(); 
var c = new cat(); 
//狗变成猫的嘴巴吃鱼
d.eat.call(c);
```
结果为:鱼。

实现继承:
```
function parents(){
    this.go = function(txt){ 
        console.log(txt);
    } 
}
function childs(){
    parents.call(this);
}
var c = new childs();
c.go("走起!!!");
```
结果:走起!!!。

多重继承:
```
function parents(){ 
    this.go = function(txt) { 
        console.log(txt);
    } 
}
    
function mother(){
    this.goBack = function(txt){ 
        console.log(txt);
    } 
}
    
function childs(){ 
    parents.call(this);
    mother.call(this);
}
var c = new childs();
c.go("走起!!!");
c.goBack('回来!!!');
```

func.call([thisObj[,arg1[, arg2[, [,.argN]]]]])
通过以上的实例,让我了解在对象时,把func的上下文传递给thisObj中,同时也把传递过去。在某些时候很有用。

Function.protype.apply

函数意义:应用某一个对象的一个方法,用另一个对象替换当前对象。

函数语法:apply([thisObj[,argArray]]);

函数说明:如果argArray不是一个有效的数组或者不是arguments对象,那么将导致 TypeError。

如果没有提供argArray和thisObj任何一个参数,那么Global对象将被用作thisObj,并且被传递任何参数.

apply和call的区别:

1.call的第二参数及以后都是参数
  apply的第二参数是数组
  
2.传递上下文功能相反。

## 参考
- http://www.cnblogs.com/sweting/archive/2009/12/21/1629204.html
- http://uule.iteye.com/blog/1158829
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call?redirectlocale=en-US&amp;redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FFunction%2Fcall
- https://blog.csdn.net/ithomer/article/details/6592082
