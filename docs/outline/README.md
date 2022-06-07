# 前端知识体系

## 浏览器

### preload/prefetch

-   link 标签
-   prefetch 比 preload 的兼容性更好，覆盖面可以达到将近 80%。

#### preload 提前加载

```html
<link rel="preload" href="style.css" as="style" />
<link rel="preload" href="main.js" as="script" />
```

立即下载：当浏览器解析到这行代码就会去加载 href 中对应的资源但不执行。

#### prefetch 预判加载

prefetch 跟 preload 不同，它的作用是告诉浏览器未来可能会使用到的某个资源，**浏览器会在闲时去加载对应的资源**，若能预测到用户的行为，比如懒加载，点击到其它页面等则相当于提前预加载了需要的资源。它的用法跟 preload 是一样的。

```html
<!-- link 模式 -->
<link rel="prefetch" href="/path/to/style.css" as="style" />

<!-- HTTP 响应头模式 -->
Link: <https://example.com/other/styles.css>; rel=prefetch; as=style
```

### async/defer
