---
layout: post
title: ECShop的插件机制实现
tag: ['php']
category: ['脚本语言']
a_id: 13
---

ecshop这款系统,在我工作之初就所接触,它是电商系统的还是比较有名的,很多创业初期的电商公司,就是用这套系统,然后对它进行二次开发.我有幸在我工作的两家公司,都用到这个系统。其实,我对它是不感冒的。但是,很多公司都在使用这个系统,我还是要学习的.

基于种种原因,我对插件机制比较喜欢,而ecshop上面明明有插件表,却没有实现插件机制,让我很不爽,我最近恰巧辞职,用了3天的时间,用自己的方式,实现了它的插件机制。

我同时也写了一个插件实例,大家都可以写插件,更好的学习ecshop的二次开发.

说了这么多,我把code地址放出来:

－ [ec_plugins_install](https://github.com/midoks/midoks/tree/master/ec_plugins_install)