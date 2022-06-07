# Vuepress 增加图片预览功能

网上搜了一下，没有好用的插件和解决方案。比如这篇文章[让 vuepress 支持图片放大功能](https://segmentfault.com/a/1190000021505365)。需要依赖 jQuery，且批量修改标签，不够优雅。于是我在网上找了一个图片预览插件[viewerjs](https://github.com/fengyuanchen/viewerjs)引入博客。美中不足打开图片的时候有延迟，不够自然流畅，后续看看能不能优化吧，先这样。

## 实现思路

两步走

### 1. 配置文件中引入插件文件：

bootcdn 在国内体验还不错。

```js
// /docs/.vuepress/config.js
module.exports = {
    head: [
        ['link', { rel: 'icon', href: '/ico.ico' }],
        [
            'link',
            {
                rel: 'stylesheet',
                href: 'https://cdn.bootcdn.net/ajax/libs/viewerjs/1.10.5/viewer.min.css',
            },
        ],
        [
            'script',
            {
                src: 'https://cdn.bootcdn.net/ajax/libs/viewerjs/1.10.5/viewer.min.js',
            },
        ],
    ],
}
```

### 2. 修改主题文件，初始化插件

修改主题文件，初始化 `Viewer`，因为我之前自定义了 `/docs/.vuepress/theme/layouts/Layout.vue`，因此直接改这个布局文件即可，理论上也可以在`Page.vue`中初始化。

```js
// /docs/.vuepress/theme/layouts/Layout.vue
export default {
    name: 'Layout',
    // ...
    watch: {
        $route() {
            this.$nextTick(this.viewerInit)
        },
    },
    mounted() {
        this.viewerInit()
    },
    methods: {
        viewerInit() {
            const el = document.getElementsByClassName('theme-default-content')?.[0]
            if (el) {
                console.log('存在文章')
                new Viewer(el)
            } else console.log('不存在文章，不初始化')
        },
    },
    // ...
}
```

大功告成。

可在[这边文章](/solution/sentry.html)中预览效果。
