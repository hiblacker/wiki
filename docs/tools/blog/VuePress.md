---
sidebarDepth: 3
---

# VuePress 增加代码复制和自定义样式

[官方文档](https://vuepress.vuejs.org/zh)

[自定义修改默认主题](https://vuepress.vuejs.org/zh/theme/inheritance.html)，即主题的继承

## 自定义修改

一些基于官方默认主题的修改

### 代码块增加复制功能

可以先了解下 VuePress 对 Markdown 的拓展：[地址](https://vuepress.vuejs.org/zh/guide/markdown.html)

增加复制只需两步：

### 1. 安装依赖 `markdown-it-copy`

### 2. 增加配置：

```js
module.exports = {
    markdown: {
        extendMarkdown: (md) => {
            md.use(require("markdown-it-copy"));
        },
    },
};
```

加完后可以看到多了一个复制按钮，样式有些丑，因为我们没有引入样式文件。

### 3. 自定义样式

-   a. 在源码中找到 [样式文件](https://github.com/ReAlign/markdown-it-copy/blob/master/theme/default.styl)
-   b. 在主题文件中增加样式文件 `.vuepress/theme/styles/index.styl` 将样式写入其中。

    如果第一次自定义修改默认主题，页面可能会错乱，需要[继承默认主题](https://vuepress.vuejs.org/zh/theme/inheritance.html)。

    这时样式已经有了，但还是很丑，可自行修改。

    最终样式：

    ![复制代码](https://cdn.superwen.cn/halo/85bb04a4bd8767968273f89749468be0.png)
