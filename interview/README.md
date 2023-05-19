# 一、常被问到的

被问到频率较高的

## HTTP 缓存，对应的字段

## flex 常用字段、三列布局

## vue 组件传值方式

## vue 响应式原理？

## 手写深拷贝

## 做过的项目遇到的问题，如何解决的(几乎必问)

## 事件循环

## 前端性能优化

# 二、大厂被问到的

大厂问的偏底层，更难一些

## try catch 能捕获 Promise 的报错吗？

## JS 数组本质，在内存中是连续的吗？

## 如何设计 UI 组件

## TS extends 作用

## TS 声明同一个 interface 会如何

## JS 是单继承还是多继承

## Webpack 与 Vite 区别

## 说下 WebComponent

## Promise resolve 做了什么？

## 垃圾回收机制

# 三、其它被问到的

## 为什么离职

## webpack

# 手写题

## 深拷贝，考虑 function、循环引用、RegExp 和 Date 等其它引用类型

## 写结果：[1,2,3] == [1,2,3] ; [1,2,3] == '1,2,3' null == undefined

考察隐式类型转换

## 正则题(高频)

1. 大小写转换: （智源）

```js
// input: asdf_sf_d
// output: asdfSfD
const t = str => str.replace(/_([a-z])/g, (_, s) => s.toUpperCase())
```

2. 日期转换（花椒）

```js
// input: 'constructor with 01/23/2001 string pattern as first argument 11/23/2002'
// output: 'constructor with 2001-01-23 string pattern as first argument 2002-11-23'
const t = str => str.replace(/(\d{2})\/(\d{2})\/(\d{4})/g, '$3-$1-$2')
```

## 算法

年前的忘记了，大厂算法几乎必考，写出来后可能会问时间复杂度多少，如何优化

```js
// 两数之和(花椒 手写)
// 给定数组，目标和值，找到对应的两个数的下标
// input: [3,4,8,9,34], 11
// output: [0, 2]
```
