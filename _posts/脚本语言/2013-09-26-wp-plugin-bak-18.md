---
layout: post
title: WordPress代码备份插件
tag: ['PHP', 'WordPress']
category: ['脚本语言']
a_id: 18
---

我由于这几天写了WordPress插件,放在BAE上的代码经常变动。有时会不小心修改错了,所有写一个wp代码备份的插件，我是直接使用百度网盘的接口(网盘都进入T时代了,多的是空间)。


### 插件地址
－ [wp-cache-db](https://github.com/midoks/WordPressPlugins/tree/master/wp-cache-db)

### WordPress代码备份插件设置

- 1

```
//备份相关
//--------------------------------
//是否是否备份
define('BACKUP_BOOL', true);
//是否开启zip压缩上传(经我测试,开启压缩备份最安全)
define('BACKUP_ZIP', true);
//定义备份文件前缀
define('BACKUP_NAME_PREFIX', 'wp');
//要备份的目录(绝对路径)
define('BACKUP_DIR', ABSPATH);
```
- 2:打开pcs/config.php文件(根据需求)

```
//API Kye
define('BACKUP_API_KEY', '百度应用api key');
//Secret Key
define('BACKUP_SECRET_KEY', '百度应用secret key');
//应用名称
define('BACKUP_BP_APP_NAME', '百度应用名称');
//直达URL(前地址)
define('BACKUP_REDIRECT_URL_PREFIX', 'http://你的地址/wp-cron.php?type=bakcode_go');
//直达URL
define('BACKUP_REDIRECT_URL', 'http://你的地址/wp-cron.php?type=bakcode_netdisk_oauth');
```
- 3
  * 登陆百度开发者应用(http://developer.baidu.com/)->管理中心->你使用应用的位置->API管理->安全设置
  * 1.填写的你域名地址
  * 2.填写你的授权回调页(http://你的地址/wp-cron.php?type=bakcode_netdisk_oauth)

- 4
  * 如果配置没有问题,先用过浏览器进入http://你的地址/wp-cron.php?type=bakcode_go
  * 这会跳转回来到百度应用授权,同意之后,会跳到'http://你的地址/wp-cron.php?type=bakcode_netdisk_oauth'

- 5
  * 进入百度应用云环境->服务管理->定时间计划任务(Cron)
  * 根据你的需求设置!!!@@

- 6 
  * 执行一次后,没有报错就进入百度个人网盘->我的应用数据