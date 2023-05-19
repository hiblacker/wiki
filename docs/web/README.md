# 前端

前端知识体系，重点归纳整理，汇总零散前端知识。

## CSS

## JavaScript

-   对象
-   数组
-   原型链
-   继承
-   闭包
-   API
    -   Promise 原理、手写
    -   instanceof 原理
-   DOM
-   [ES6](./javascript/es6.md)
-   事件循环
    -   微任务执行时，产生新的微任务，如何执行？

## [TypeScript](./typescript/README.md)

[TypeScript 类型体操通关秘籍](https://www.yuque.com/yoho/vokwx8)

## 浏览器

-   [浏览器渲染原理流程](./HTML/浏览器渲染原理流程.md)

## 框架

### Vue

-   [响应式原理](./framework/vue-reactivity.md)
-   diff 算法

### React

## 算法

[前端算法与数据结构](https://www.yuque.com/yoho/strf06)

## 设计模式

[JavaScript 设计模式核⼼原理与应⽤实践](https://www.yuque.com/yoho/cbi954)

## Node.js

Node 是一个基于 V8 引擎的 Javascript 运行环境，它使得 Javascript 可以运行在服务端，与操作系统交互，进行文件控制、网络控制、进程控制等。

## 工程化


- [什么是前端工程化？工程化的理解](./project/thought.md)
- [前端性能优化](./project/performance.md)
-   [Webpack](./project/webpack.md)
-   Vite
-   Rollup
-   DevOps

### 案例

-   图片压缩

## 计算机基础

### 网络

-   HTTP: 强缓存/协商缓存
-   HTTP: 状态码
-   HTTP 与 HTTPS 区别
    -   HTTP 是明文传输，HTTPS 的数据传输是经过 SSL 加密的，更加安全。
    -   HTTP 使用 TCP 三次握手交换三个包建立连接，HTTPS 除了三次握手还需要 SSL 握手，需要交换 9 个包，因此速度慢于 HTTP，更耗费服务器资源。
    -   HTTP 默认 80 端口，HTTPS 默认 443 端口
-   HTTPS 加密原理
-   TCP：三次握手、四次挥手
-   DNS 流程
-   跨域
