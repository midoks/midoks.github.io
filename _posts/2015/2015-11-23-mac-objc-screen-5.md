---
layout: post
title: Mac桌面应用获取屏幕的宽高
tag: ['object-c']
category: ['Mac桌面开发']
a_id: 5
excerpt: Mac OSX 获取屏幕的高度和宽度
---

swift获取屏幕的高度和宽度

### 代码
```
func demo()
{
    //屏幕的高度
    print(NSScreen.mainScreen()?.frame.height)
    //屏幕的宽度
    print(NSScreen.mainScreen()?.frame.width)
}
```
