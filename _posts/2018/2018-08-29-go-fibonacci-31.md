---
layout: post
title: Go实现的斐波那契数列
tag: ['go']
categories: ['编译语言','算法']
a_id: 31
---

斐波那契数列(黄金分割数列),这个数列从第3项开始，每一项都等于前两项之和,递推公式：1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

### 源码

```
package main
 
import "fmt"
 
// fibonacci is a function that returns
// a function that returns an int.
func fibonacci() func() int {
    first, second := 0, 1
    var out int
    return func() int {
        out, first = first, second
        second = out + first
        return out
    }
}
 
func main() {
    f := fibonacci()
    for i := 0; i < 10; i++ {
        fmt.Println(f())
    }
}

```

- go run fibonacci.go 

```
midoks$ go run fibonacci.go 
0
1
1
2
3
5
8
13
21
34
```




