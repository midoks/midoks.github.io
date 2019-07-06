---
layout: post
title: mdserver-mac 3.1.0.3 (PHP一键搭建环境)
tag: ['php']
categories: ['编译语言']
a_id: 47
---

## mdserver(mac版) 3.1.0.3
mac上高度可定制的PHP开发环境,集成必要的扩展,方便使用。
(pkg安装方式),安装方便,是你Mac上的PHP开发利器。
- 支持80端口。
- 配置memcached,redis,mongodb通用支持。
- 配置MySQL5.6。
- openresty支持lua开发。
- **php-fpm以sock文件方式管理。多php进程共存,快速切换开发。**
- **高效控制PHP扩展安装、启动、停止、卸载。**
- **完美再现安装过程，利于学习**
- 安装完全脚本化,易于管理。
- 减小文件大小，利于下载。

```
php54-73
[redis,memecached,mongo,yaf,swoole,xhprof,...]
```

- https://github.com/midoks/mdserver-mac

### 相关项目

- 最新的安装脚本[mdserver-mac-reinstall](https://github.com/midoks/mdserver-mac-reinstall) 

### 3.1.0.3[操作说明]

```
菜单[CMD]->php-ext-init->install(解决大部分的依赖问题)
```

### 版本版本
- 3.1.0.3

```
* 加入php74测试版
* 解决PHP扩展intl,curl,swoole,openssl,yar,imagick依赖问题.
```

- 3.0.2.2

```
* 加入xdebug扩展[php73编译没有通过]
* 升级php部分版本
* 修复一些配置错误
```

- 3.0.1.2

```
* 减少php53的维护,但保留执行安装脚本
* 加入pcntl扩展
```

### 文件说明
- host(修改hosts命令)
- mdserver(主功能)
- Screenshot(截图)

### 相关链接 - 3.1.0.3
- 下载地址-百度:[3.1.0.3](https://pan.baidu.com/s/1W3OBhQ1UfTR1_Xx6i-Iinw)
- 下载地址-微云:[3.1.0.3](https://share.weiyun.com/5eOmW6v)


### 相关链接 - 3.0.2.2
- 下载地址-微云:[3.0.2.2](https://share.weiyun.com/5CpRsYI)
- 下载地址-百度提取码(waeh):[3.0.2.2](https://pan.baidu.com/s/1mSrM_yuqwEQ46zl8IO7IFw)

### 相关链接 - 3.0.1.2
- 下载地址-微云:[3.0.1.2](https://share.weiyun.com/5tip6wD)
- 下载地址-百度提取码(exsw):[3.0.1.2](https://pan.baidu.com/s/1oEq1GtPgKY6inbaXoNsmDg)

### 相关链接 - 3.0.0.0
- 下载地址-微云:[3.0.0.0](https://share.weiyun.com/5mDuEiO)
- 下载地址-百度提取码(jf71):[3.0.0.0](https://pan.baidu.com/s/1RIox0w8Lplvwd4Nw8B-hwg)

### 使用说明
[说明](https://github.com/midoks/mdserver-mac/wiki/%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E-3.0)

### 学习版本
- 下载地址:[3.0.0.0](https://midoks.oss-cn-hangzhou.aliyuncs.com/mdserver3.0.0.0_selfinstall.pkg.zip)



### 最新版本截图
[![Screenshot_3.png](https://raw.githubusercontent.com/midoks/mdserver-mac/master/Screenshot/Screenshot_3.png)](https://github.com/midoks/mdserver-mac)

