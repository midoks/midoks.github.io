---
layout: post
title: linux上sudo使用
tag: ['shell']
category: ['脚本语言']
a_id: 9
---

简单的说，sudo 是一种权限管理机制，管理员可以授权于一些普通用户去执行一些 root 执行的操作，而不需要知道 root 的密码。
严谨些说，sudo 允许一个已授权用户以超级用户或者其它用户的角色运行一个命令。当然，能做什么不能做什么都是通过安全策略来指定的。sudo 支持插件架构的安全策略，并能把输入输出写入日志。第三方可以开发并发布自己的安全策略和输入输出日志插件，并让它们无缝的和 sudo 一起工作。默认的安全策略记录在 /etc/sudoers 文件中。而安全策略可能需要用户通过密码来验证他们自己。也就是在用户执行 sudo 命令时要求用户输入自己账号的密码。如果验证失败，sudo 命令将会退出。

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
vi /etc/sudoers
```
## 全部的权限
test1    ALL=(ALL)       ALL
## 给出特殊命令权限
test1 ALL=(root) /bin/chown, /bin/chmod
#跟root一样的权限,而无需知道root的密码.(比较危险)
test1   ALL=(ALL)NOPASSWD:ALL
