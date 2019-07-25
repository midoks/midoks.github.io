---
layout: post
title: mdserver-web 0.7.3 (PHP集成管理界面)
tag: ['python','php']
categories: ['脚本语言']
a_id: 49
---

### mdserver-web 0.7.3
简单的Linux面板,感谢BT.CN写出如此好的web管理软件。我一看到，就知道这是我一直想要的页面化管理方式。
复制了后台管理界面，按照自己想要的方式写了一版。
* ssh工具优化
* 面板收藏功能完成
* 网站子目录绑定
* 网站备份功能
* 自动更新优化
* 插件方式管理

### 主要插件介绍
* OpenResty - 轻量级，占有内存少，并发能力强。
* PHP - PHP是世界上最好的编程语言。
* MySQL - MySQL是一种关系数据库管理系统。
* phpMyAdmin - 著名Web端MySQL管理工具。
* Memcached - 一个高性能的分布式内存对象缓存系统。
* Redis - 一个高性能的key-value数据库。
* CSVN - 最流行的SVN代码共享管理软件。
* PureFtpd - 一款专注于程序健壮和软件安全的免费FTP服务器软件。
* Gogs - 一款极易搭建的自助Git服务。

基本上可以使用,后续会继续优化!欢迎提供意见！

### 一键自动安装
```
curl -fsSL  https://raw.githubusercontent.com/midoks/mdserver-web/master/scripts/install.sh | sh
```

### 自动更新
```
curl -fsSL  https://raw.githubusercontent.com/midoks/mdserver-web/master/scripts/update.sh | sh
```

### 无图不真相
[![截图](https://raw.githubusercontent.com/midoks/mdserver-web/master/route/static/mdw.jpg)](https://raw.githubusercontent.com/midoks/mdserver-web/master/route/static/mdw.jpg)

### wiki
[了解更多...](https://github.com/midoks/mdserver-web/wiki)

