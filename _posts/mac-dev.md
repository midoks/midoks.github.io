---
layout: post
title: Mac桌面开发简介
tag: ['Mac', 'Object-c']
category: ['Mac桌面开发']
a_id: 4
---
	
###前言
	ZIP文件由三部分构成:压缩文件的内容数据、压缩的目录源数据、目录结束表示结构。

###压缩的文件内容源数据
	记录着压缩的所有文件的内容信息,其数据组织结构是对于每个文件都由file header、file data、data descriptor三部分组成:
	1.file header:用于标示该文件的开始,结构说明如下: