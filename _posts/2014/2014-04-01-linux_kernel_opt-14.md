---
layout: post
title: linux内核参数优化
tag: ['linux']
category: ['运维']
a_id: 14
---

首先,我要表明这不是我写的,我只是收集起来,整理一下,并加深自己的认识。


```
#表示开启SYN Cookies.当出现SYN等待队列溢出时,启用cookies来处理,
#可防范少量SYN攻击，默认为0，表示关闭;
net.ipv4.tcp_syncookies = 1
  
#表示SYN队列的长度,默认为1024,加大队列长度为8192,
#可以容纳更多等待连接的网络连接数;
net.ipv4.tcp_max_syn_backlog = 65536
  
#时间戳可以避免序列号的卷绕。一个1Gbps的链路肯定会遇到以前用过的序列号,
#时间戳能够让内核接受这种"异常"的数据包.这里需要将其关掉;
net.ipv4.tcp_timestamps = 0
  
#tcp_synack_retries 显示或设定 Linux 核心在回应 SYN 要求时会尝试多少次重新发送初始 SYN,ACK 封包后才决定放弃。
#这是所谓的三段交握 (threeway handshake) 的第二个步骤。即是说系统会尝试多少次去建立由远端启始的 TCP 连线。
#tcp_synack_retries 的值必须为正整数，并不能超过 255。因为每一次重新发送封包都会耗费约 30 至 40 秒去等待才决定尝试下一次重新发送或决定放弃。
#tcp_synack_retries 的缺省值为 5，即每一个连线要在约 180 秒 (3 分钟) 后才确定逾时。
net.ipv4.tcp_synack_retries = 2
  
#在内核放弃建立连接之前发送SYN包的数量.
net.ipv4.tcp_syn_retries = 2
  
#表示开启TCP连接中TIME-WAIT sockets的快速回收,默认为0,表示关闭;
net.ipv4.tcp_tw_recycle = 1
#net.ipv4.tcp_tw_len = 1
  
#表示开启重用.允许将TIME-WAIT sockets重新用于新的TCP连接,
#默认为0,表示关闭;
net.ipv4.tcp_tw_reuse = 1
  
#同样有3个值,意思是:
#net.ipv4.tcp_mem[0]:低于此值，TCP没有内存压力.
#net.ipv4.tcp_mem[1]:在此值下，进入内存压力阶段.
#net.ipv4.tcp_mem[2]:高于此值，TCP拒绝分配socket.
#上述内存单位是页，而不是字节。可参考的优化值是:786432 1048576 1572864
net.ipv4.tcp_mem = 94500000 91500000 92700000
  
#系统中最多有多少个TCP套接字不被关联到任何一个用户文件句柄上。
#如果超过这个数字，孤儿连接将即刻被复位并打印出警告信息。
#这个限制仅仅是为了防止简单的DoS攻击,不能过分依靠它或者人为地减小这个值,
#更应该增加这个值(如果增加了内存之后);
net.ipv4.tcp_max_orphans = 3276800
  
#表示如果套接字由本端要求关闭,这个参数决定了它保持在FIN-WAIT-2状态的时间;
net.ipv4.tcp_fin_timeout = 30
  
#表示当keepalive起用的时候,TCP发送keepalive消息的频度,
#缺省是2小时，改为20分钟
net.ipv4.tcp_keeplive_time = 1200
  
#表示用于向外连接的端口范围.缺省情况下很小:32768到61000,改为1024到65000;
net.ipv4.ip_local_port_range = 1024 65535
  
#表示系统同时保持TIME_WAIT套接字的最大数量,如果超过这个数字,
#TIME_WAIT套接字将立刻被清除并打印警告信息。默认为180000,改为 5000.
#对于Apache、Nginx等服务器.上几行的参数可以很好地减少TIME_WAIT套接字数量;
net.ipv4.tcp_max_tw_buckets = 5000
  
#######################################
  
#每个网络接口接收数据包的速率比内核处理这些包的速率快时,
#允许送到队列的数据包的最大数目;
net.core.netdev_max_backlog = 32768
  
#web应用中listen函数的backlog默认会给我们内核参数的net.core.somaxconn
#限制到128而nginx定义的NGX_LISTEN_BACKLOG默认为511，所以有必要调整这个值。
net.core.somaxconn = 32768
  
#最大socket读buffer,可参考的优化值:873200
net.core.wmem_default = 8388608
net.core.rmem_default = 8388608
net.core.rmem_max = 16777216
  
#最大socket写buffer,可参考的优化值:873200
net.core.wmem_max = 16777216
```

把参数配置修改到linux目录/etc/sysctl.conf中。
用下面的命令,可以是用它马上生效。

```
sysctl  -p
```

### 参考
- https://www.ibm.com/developerworks/cn/linux/l-hisock.html
- http://wiki.debian.org.hk/w/File:/proc/sys


