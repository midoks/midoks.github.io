---
layout: post
title: WP微信机器人
tag: ['WP微信机器人', 'PHP', 'WordPress']
category: ['脚本语言']
a_id: 1
---
	
###前言
这个插件不是很难,却让我感受到了互联网上人与人的连接。也通过网友需求,我把这个插件开发的较为完整了。
我会随着微信平台的发展而继续开发。感谢互联网,感谢网友。

###插件地址
－ [wordpress.org/plugins/wp-weixin-robot/](http://wordpress.org/plugins/wp-weixin-robot/)

###版本更替
- 5.2.24
	* 增加long2short接口(长链接转化为短链接)[weixin-core.class.php]
	* 增加智能接口->语意理解接口。
	* 新增加get_ticket_url接口(简单获取二维码地址,详情看接口代码)。
	* 新增getCustomServiceLog接口(获取用户与客服记录)。
	* 新增updateRemark接口(对用户进行备注)。
	* 修改getUserInfo接口
	* 为优化uploadMsgImageText接口
	* 新增sendGroupInfo群发测试接口
	* 新增getAcceptInfo(获取接受的所有信息),getConfigInfo(获取本插件的所有配置信息),getUserOpenID(用户ID),getAppID(获取开发AppID),getAppSelect(获取开发AppSelect)等接口。
	* 新增模版接口发送函数:sendTemplateInfo。
	* 新增获取微信ip地址:getWeixinIp。
	* 对事件推送群发结果,模版事件推送结果,进行了处理。
	* 优化接口注释
- 5.2.11
	* 实现聊天功能(服务号可用)
	* 修复上一份(5.2.6)代码复制时,导致菜单部分功能不可用
	* 优化搜索(?命令)
	* 修复扩展的bug
	* 增强扩展功能
- 5.2.6
	* 扩展锁机制(要我老命的开发啊!)
	* 后台菜单控制
	* 加速微信机器人(验证)响应速度(为那些速度有慢,但不至于当机的..,我劝你们转到"快"的阵营来吧)
	* 新增自定义音乐类型
	* 支持多个关键字设置
	* 更新后台扩展界面
	* 严格的插件的信息获取,如果没有填写完整,则读取不到
- 5.1.8
	* 增加 @分类名!页数
	* 标签获取(修复)
	* 菜单获取, 从微信更新到本地来。(click事件,要进行修改。)
	* 关键字回复设置(bug修复,并提升效率)
	* 整加字段 ALTER TABLE  `midoks_weixin_robot` ADD  `response_time` DOUBLE( 10, 6 ) NOT NULL DEFAULT 0.00 COMMENT  '响应时间';
	* 增加订阅插件类型(有些对订阅回复,有特殊需求的人)。
	* 增加all插件类型(可以根据自己的需求,随意定制,需谨慎使用);
	* 修改r,h,n方式。
- 5.0
	* 通过WordPress官方插件申请。
	* 讲插件改名为扩展。
	* 修改BUG。
	* 在修复的基础上，我把菜单设置，分离出来，用插件方式设置(你可以自己返回的结果)。
	* 优化了一下菜单事件显示。
	* 在网友的意见下,我修正了一些基本的回复信息。增加了#,@的关键回复。
	* 恩,还有在wordpress3.8.1下的插件,最好<?php ?>标签写完整,不然会出现意料之后的后果。
- 4.0
	* 对代码进行了优化,并增加插件机制。
	* 增加了回复数字"0",返回分类列表。
	* 推送功能(实验性)[服务号可以用]
- 3.0
	* 提供一个简单的统计功能。
	* 提供了关键字回复设置功能。
	* 对菜单设置功能进行了优化。
- 2.0
	* 对服务号,进行了支持
	* 提供图片最优显示(图文消息)
	* 提供测试模式(http://你的地址/?midoks&debug=1&kw=?)
	* 对微信各事件进行了分离,如果你懂代码,可以进行二次开发。
- 1.0
	* 使用WordPress,下载我的插件,并启用。
	* [注册公众平台](http://weixin.qq.com)
	* 设置URL,与WordPress相连接。http://你的地址/?midoks
	* 设置TOKEN:midoks