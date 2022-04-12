---
layout: post
title: Go GC如何检测内存对象中是否包含指针
tag: ['go','gc']
categories: ['go','gc']
a_id: 59
---

Go GC如何检测内存对象中是否包含指针

```
// demo1.go
func main() {
    a := make([]*int, 1e9) 

    for i := 0; i < 10; i++ {
        start := time.Now()
        runtime.GC()
        fmt.Printf("GC took %s\n", time.Since(start))
    }

    runtime.KeepAlive(a)
}
```

`程序中调用runtime.KeepAlive函数用于保证在该函数调用点之前切片a不会被GC释放掉。`


```
$ go run demo1.go
GC took 21.083192734s
GC took 9.334118319s
GC took 10.817873381s
GC took 12.386702266s
GC took 10.888421323s
GC took 12.969454884s
GC took 11.048199234s
GC took 10.640267757s
GC took 11.841055348s
GC took 16.164016076s
```

```
// demo2.go
func main() {
    a := make([]int, 1e9) 

    for i := 0; i < 10; i++ {
        start := time.Now()
        runtime.GC()
        fmt.Printf("GC took %s\n", time.Since(start))
    }

    runtime.KeepAlive(a)
}
```


```
$ go run demo2.go
GC took 1.137133ms
GC took 828.054µs
GC took 575.003µs
GC took 591.835µs
GC took 504.466µs
GC took 507.795µs
GC took 1.173192ms
GC took 544.872µs
GC took 541.408µs
GC took 556.295µs
```

## 参考
- https://tonybai.com/2022/02/21/how-gc-detect-pointer-in-mem-obj/