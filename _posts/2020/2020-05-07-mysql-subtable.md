---
layout: post
title: 面试问题-分表问题
tag: ['mysql']
categories: ['运维']
a_id: 54
---

在一次面试遇到问题。一个订单表通过订单ID取模水平拆分到1024分表中。有orderid,和uid。要求通过uid查到订单信息。

- 我之前遇到。有一个张主表加（1024）分表的方式。可以直接主表通过uid查询orderid。应该不是面试想要的，就没有回答起。
- 后面我想了一下，还是(面试官:还是要建立映射关系？)要加入一个表，让uid和orderid建立关系，在分表中再加入pre_orderid一个字段。
添加新的订单时，把上一订单ID记录下来。
  * 现在就可以通过uid查看最新订单信息。
  * 还能通过pre_orderid的获取用户下的订单列表信息，但是要多次查询。


