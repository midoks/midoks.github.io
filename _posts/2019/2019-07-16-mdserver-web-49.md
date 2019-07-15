---
layout: post
title: mdserver-web[Linux服务器上PHP集成管理界面]
tag: ['python','php']
categories: ['脚本语言']
a_id: 49
---

### mdserver-web[Linux] 0.7.3
简单的Linux面板,感谢BT.CN写出如此好的web管理软件。我一看到，就知道这是我一直想要的页面化管理方式。
复制了后台管理界面，按照自己想要的方式写了一版。

* ssh工具优化
* 面板收藏功能完成
* 网站子目录绑定
* 网站备份
* 自动更新优化
* 插件[openresty,php,mysql,memcached,redis,pureftp,sphinx,rsync...]

基本上可以使用,后续会继续优化!

### 自动安装
```
curl -fsSL  https://raw.githubusercontent.com/midoks/mdserver-web/master/scripts/install.sh | sh
```

### 更新

```
curl -fsSL  https://raw.githubusercontent.com/midoks/mdserver-web/master/scripts/update.sh | sh
```

### 无图不真相
[![截图](https://raw.githubusercontent.com/midoks/mdserver-web/master/route/static/mdw.jpg)](https://raw.githubusercontent.com/midoks/mdserver-web/master/route/static/mdw.jpg)

### wiki
[了解更多...](https://github.com/midoks/mdserver-web/wiki)

