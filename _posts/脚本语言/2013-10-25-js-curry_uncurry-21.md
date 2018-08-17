---
layout: post
title: javascrpt的柯里化和反柯里化
tag: ['javascript']
category: ['脚本语言']
a_id: 21
---

在上网找到的一种概念,值得深入学习一下。

柯里化在维基百科上定义为:是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数,并且返回接受余下的参数而且返回结果的新函数的技术。

看起来有点迷糊吧,"如果你固定某些参数,你将得到接受余下参数的一个函数",这句我想比较好理解一些。


```
//柯里化
function curry(fn) {
    var outerArgs = Array.prototype.slice.call(arguments, 1);
    return function() {
        var innerArgs = Array.prototype.slice.call(arguments),finalArgs = outerArgs.concat(innerArgs);
        return fn.apply(null, finalArgs); //注意别漏了return
    };
}
     
//传递参数1,参数2
var func1 = curry(function(){
    var args = [].slice.call(arguments);
    console.log(args.join(':'));
},"1", "2");
     
//传递参数3,参数4
var func2 = curry(func1, "3", "4");
setInterval(curry(func2, "5", "6"), 1000);
```

接下了反柯里化,

说明:

1.一种是使用匿名单参数函数来实现多参数函数的方法。

2.给函数预先传入参数,缩小函数的适用范围,并返回一个更精确地函数,起作用扩大函数的适用性,使本来作用特定对象所拥有功能的函数可以对全体对象适用。

看了一下上面的我的头有点晕了,还是用代码来实现以下:

```
//反柯里化
Function.prototype.uncurry = function(){
    var _this = this; //_this就是Array.prototype.push
    return function(){
        //Array.prototype.push当做Function.prototype.call的this传进去
        return Function.prototype.call.apply(_this, arguments);
        //arguments是[obj, 'first'],apply接受数组形式的参数
        //接下来被直接传递给Array.prototype.push.call
        //call接受以逗号分割的N个参数的形式
        //所以arguments中的第一个参数(这里为obj),会被当成call里面的this,
        //其他的参数依次传入call
        //整个代码相当于Array.prototype.push.call(obj, 'first');
    }
}
var push = Array.prototype.push.uncurry();
var obj = {};
push(obj,'first');
console.log(obj);
```

只能感叹,浓缩就是精华啊。

感觉用处并不是很大,也许某个时候就是它展现的的舞台。

如果没看懂,请点击参考2,讲的很好。

- https://www.zhangxinxu.com/wordpress/2013/02/js-currying/
- http://www.alloyteam.com/2013/08/javascript-zhong-you-qu-di-fan-ke-li-hua-ji-shu/
