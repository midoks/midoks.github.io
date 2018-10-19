---
layout: post
title: Go实现的插入排序算法
tag: ['go']
categories: ['编译语言','算法']
a_id: 40
---

有一个已经有序的数据序列，要求在这个已经排好的数据序列中插入一个数，但要求插入后此数据序列仍然有序，这个时候就要用到一种新的排序方法——插入排序法

### 源码

```
package main

import (
    "fmt"
    "math/rand"
    "time"
)

const (
    num      = 10
    rangeNum = 10
)

func main() {
    randSeed := rand.New(rand.NewSource(time.Now().Unix() + time.Now().UnixNano()))
    var buf []int
    for i := 0; i < num; i++ {
        buf = append(buf, randSeed.Intn(rangeNum))
    }
    t := time.Now()

    // 插入排序
    insertSort(buf)
    fmt.Println(buf)
    fmt.Println(time.Since(t))
}

// 插入排序
func insertSort(buf []int) {
    times := 0
    for i := 1; i < len(buf); i++ {
        for j := i; j > 0; j-- {
            if buf[j] < buf[j-1] {
                times++
                tmp := buf[j-1]
                buf[j-1] = buf[j]
                buf[j] = tmp
            } else {
                break
            }
        }
    }
    fmt.Println("insert sort times: ", times)
}


```

- go run insert.go

```
midoksdeMacBook-Pro:test midoks$ go run insert.go 
insert sort times:  17
[1 2 3 4 5 5 5 6 6 9]
54.299µs
```




