---
layout: post
title: mdserver-mac(PHP一键搭建环境)
tag: ['Object-c', 'php', 'nginx', 'mysql']
categories: ['编译语言']
a_id: 4
---

### 前言
mdserver-mac是我在mac上开发一款在php集成环境。你可以随意定制自己PHP扩展,可以对PHP,Nginx进行二次开发。

### 软件地址
- 源代码:[mdserver(GitHub)](https://github.com/midoks/mdserver-mac)
- 安装文件:[mdserver(百度盘)](http://pan.baidu.com/s/1bnfcs4B)

### 介绍
- 集成软件
	* PHP5.5.14(NTS)
	* nginx/1.7.7
	* MySQL5.1.73
	* yaf
	* yar
	* swoole
	* imagick
	* xhprof
- 说明
	* MySQL默认用户名：root，密码为root
	* MySQL数据库文件存放目录：MySQL\data

### 截图
[![Screenshot-1.png](/resources/project/mdserver-mac/Screenshot/Screenshot-1.png)](/resources/project/mdserver-mac/Screenshot/Screenshot-1.png)
[![Screenshot-2.png](/resources/project/mdserver-mac/Screenshot/Screenshot-2.png)](/resources/project/mdserver-mac/Screenshot/Screenshot-2.png)
[![Screenshot-3.png](/resources/project/mdserver-mac/Screenshot/Screenshot-3.png)](/resources/project/mdserver-mac/Screenshot/Screenshot-3.png)

### 注意
- 测试当中的一些问题
    * 提示你输入密码时,请一定要输入你的登陆密码
    * 端口要大于1023(0-1023是系统端口,我没有root权限启动)
    * mdserver和mdserver目录放在应用目录下。(mdserver app和mdserver目录必须在同一目录中,你也可以放在其他的目录,你就需要重新编译nginx,和一些特殊的php扩展)
