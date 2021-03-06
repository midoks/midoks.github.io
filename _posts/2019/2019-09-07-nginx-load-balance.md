---
layout: post
title: NGINX的负载均衡配置
tag: ['nginx']
categories: ['编译语言']
a_id: 52
---

当一台服务器的单位时间内的访问量越大时，服务器压力就越大，大到超过自身承受能力时，服务器就会崩溃。为了避免服务器崩溃，让用户有更好的体验，我们通过负载均衡的方式来分担服务器压力。

我们可以建立很多很多服务器，组成一个服务器集群，当用户访问网站时，先访问一个中间服务器，在让这个中间服务器在服务器集群中选择一个压力较小的服务器，然后将该访问请求引入该服务器。如此以来，用户的每次访问，都会保证服务器集群中的每个服务器压力趋于平衡，分担了服务器压力，避免了服务器崩溃的情况。

负载均衡的几种常用方式:

1、轮询（默认）
每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除。
```
upstream backserver {
    server 192.168.0.14;
    server 192.168.0.15;
}
```

2、weight
指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的 
情况。
```
upstream backserver {
    server 192.168.0.14 weight=3;
    server 192.168.0.15 weight=7;
}
```
权重越高，在被访问的概率越大，如上例，分别是30%，70%。

3、ip_hash
上述方式存在一个问题就是说，在负载均衡系统中，假如用户在某台服务器上登录了，那么该用户第二次请求的时候，因为我们是负载均衡系统，每次请求都会重新定位到服务器集群中的某一个，那么已经登录某一个服务器的用户再重新定位到另一个服务器，其登录信息将会丢失，这样显然是不妥的。
我们可以采用ip_hash指令解决这个问题，如果客户已经访问了某个服务器，当用户再次访问时，会将该请求通过哈希算法，自动定位到该服务器。
每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题。
```
upstream backserver {
    ip_hash;
    server 192.168.0.14:88;
    server 192.168.0.15:80;
}
```
4、fair（第三方）
按后端服务器的响应时间来分配请求，响应时间短的优先分配。
```
upstream backserver {
    server server1;
    server server2;
    fair;
}
```

5、url_hash（第三方）
按访问url的hash结果来分配请求，使每个url定向到同一个（对应的）后端服务器，后端服务器为缓存时比较有效。
```
upstream backserver {
    server squid1:3128;
    server squid2:3128;
    hash $request_uri;
    hash_method crc32;
}
```
在需要使用负载均衡的server中增加
```
proxy_pass http://backserver/; 
upstream backserver{ 
    ip_hash; 
    server 127.0.0.1:9090 down; (down 表示单前的server暂时不参与负载) 
    server 127.0.0.1:8080 weight=2; (weight 默认为1.weight越大，负载的权重就越大) 
    server 127.0.0.1:6060; 
    server 127.0.0.1:7070 backup; (其它所有的非backup机器down或者忙的时候，请求backup机器) 
}
```
max_fails ：允许请求失败的次数默认为1.当超过最大次数时，返回proxy_next_upstream 模块定义的错误

fail_timeout:max_fails次失败后，暂停的时间
配置实例：
```
#user  nobody;

worker_processes  4;
events {
# 最大并发数
worker_connections  1024;
}
http{
    # 待选服务器列表
    upstream myproject{
        # ip_hash指令，将同一用户引入同一服务器。
        ip_hash;
        server 125.219.42.4 fail_timeout=60s;
        server 172.31.2.183;
    }

    server{
        # 监听端口
        listen 80;
        # 根目录下
        location / {
        # 选择哪个服务器列表
            proxy_pass http://myproject;
        }

    }
}
```


- https://segmentfault.com/a/1190000014483200




