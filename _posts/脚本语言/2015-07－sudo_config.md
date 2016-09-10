---
layout: post
title: sudo设置
tag: ['sudo设置', 'shell']
category: ['脚本语言']
a_id: 1
---

### 先查看当前用户
```
cat /etc/passwd
```

### 添加用户并设置密码
```
useradd test1
passwd test1
```
### 修改sudo的权限
```
view sourceprint?
vi /etc/sudoers
```
##全部的权限
test1    ALL=(ALL)       ALL
##给出特殊命令权限
test1 ALL=(root) /bin/chown, /bin/chmod
#跟root一样的权限,而无需知道root的密码.(比较危险)
test1   ALL=(ALL)NOPASSWD:ALL
