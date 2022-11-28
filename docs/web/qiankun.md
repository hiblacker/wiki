# 微前端落地实战

## 什么是微前端

微前端为什么叫做微前端？主要是相对服务端的微服务来说的，微服务是将大型应用拆分为更小的独立服务，而微前端，可以理解为可以
被动态加载的前端模块资源。这个范围比较广，可以认为是广义的微前端。

## 为什么要做微前端

实际上对于这个最基本的问题，答案就不止一个。微前端的鼻祖 Single-spa 最初要解决的问题是，在老项目中使用新的前端技术栈，那
到现阶段，蚂蚁金服微前端框架 Qiankun 所声明的微前端想要解决的另一个主要问题是，**巨石工程的维护困难和协作开发困难**。而
这两个目标基本上是一致的，主要目标是拆分，对大型工程进行解耦。这就是我们现在作为技术方案谈论的微前端所要解决的主要问题，
也是我所认为的狭义微前端范围。而相对应的广义微前端范围的问题还包括组件或者说模块的动态引用（运行时加载），粒度相对比较小
，并不是以系统层面的拆分为目的，反而是以整合为目的。

## 微前端怎么做？

使用阿里 [qiankun](https://qiankun.umijs.org/zh) 解决方案。

微前端并不是银弹，它只是为了解决特定问题而产生的方案，而且有自己的弊端，比如下图中阿里云的总结。

![](https://cdn.superwen.cn/halo/868a87e13af921214a47bd8f34e9cb02.)

## 主应用配置

1. 在 `.env` 文件中配置域名，各环境对应文件：

```shell
# 兜底配置（开发环境）
.env
# 测试环境
.env.staging
# 预发环境
.env.performance
# 生产环境
.env.production
```

1. 在 `/src/mapp.config.js` 中配置微应用加载规则，如路径 `/mapp/call-center/bi-board` 主要分
   三级:
    - `mapp` 当雅典娜匹配到此一级路径时，会提供一个容器，用于加载子应用。
    - `call-center` 即为 `mapp.config.js` 中配置的 `path`，用于辨别加载哪个子应用。
    - `bi-board` 为子应用页面路径

```js
/**
 * 各模块一级路由，用于匹配菜单，并高亮当前
 */
// 呼叫中心
const CALL_CENTER = '/callCenter'

/**
 * 微应用配置
 */
// 不要在此处修改，可在 .env.local 中自定义该变量
const local = process.env.VUE_APP_MAPP_ENTRY || '//localhost:8080'
const devEntry = v => (process.env.VUE_APP_MODE == 'local' ? local : v)
const config = [
    {
        name: '呼叫中心',
        // 此处配置为：当页面路径满足 `mapp/call-center` 时，会加载此微应用
        path: 'call-center',
        // 目标模块
        target: CALL_CENTER,
        entry: devEntry(process.env.VUE_APP_CALL_CENTER),
        // 是否开启v3的element-plus样式兼容， 默认开启
        cssHack: false,
    },
]

export default config
```

## 子应用配置

参照[官方实践](https://qiankun.umijs.org/zh/guide/tutorial#vue-%E5%BE%AE%E5%BA%94%E7%94%A8)

### 路由配置

鉴于主应用雅典娜路由模式为 hash，因此子应用也需要使用 hash 模式，路由需要参照以下配置：

```js
const routes = [
    {
        // 此处即为雅典娜 `/src/mapp.config.js` 中配置的
        path: '/mapp/share/',
        name: 'share',
        component: () => import('@/views/base.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/views/Home'),
            },
            {
                path: 'about',
                name: 'about',
                component: () => import('@/views/About'),
            },
        ],
    },
]
```

`base.vue` 页面是为了兼容 `/mapp/share/` 二级路径:

```vue
<template>
    <router-view></router-view>
</template>

<script>
export default {
    name: 'app-base',
}
</script>
```

### 菜单当前状态

更新：在 `mapp.config.js` 中直接配置 `target` 即可。

### 样式冲突

为避免样式冲突，所有组件样式加 scoped 限制，全局样式加类名或 id 限制，如：

```css
#call-center {
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
}
```

## 服务器配置

1. 申请服务器（0.5c/1g）、域名

    域名：建议统一域名格式为：'mapp-' + 一级菜单域名 如: mapp-call-center.naxions.com 不应使用大写字母，建议使用连字符

2. 需要服务器配置跨域

## Vuex：子应用使用主应用 store

store 状态应尽量放在子应用中独立管理，主应用中只存放全局状态，以便多方调用。也就是只有需要跨子应用调用的状态，才应该放到
主应用中。可参考：

### 主应用的 store 挂载到 window 对象：

```js
import store from '@/store'
window.STORE = store
```

在子应用内使用：

```js
export default {
    name: 'app',
    created() {
        // state
        this.userInfo = STORE.state.app.userInfo
        // commit
        STORE.commit('app/SET_USERINFO')
        // dispatch
        STORE.dispatch('app/getUserInfo')
    },
}
```

这样虽然可以使用，但是如果将 state 绑定到子应用的视图上，当状态 state 变更时，子应用的视图无法获得更新。

我们可以通过 Vue 的 api 来将 state 变的可响应：

```js
Vue.observable(window.STORE)
```

这样主应用的 state 变化时，子应用的视图得以更新。

但这样会有一个很严重的问题，主应用的 state 的依赖 dep 会被覆盖掉导致主应用的依赖 state 的视图无法获得响应式更新。

为了解决这个问题，我们可以通过 vuex 提供的插件能力，来独立维护一棵 state 树：

```js
import _ from 'lodash'
// 为子应用提供状态驱动，手动维护状态树，避免子应用使用observable后覆盖主应用的状态订阅
const subStore = store => {
    window.STORE_STATE.state = _.cloneDeep(store.state)
    let timer
    // 当 store 初始化后调用
    store.subscribe((mutation, state) => {
        const action = mutation.type.split('/')
        if (!action?.[0]) return console.warn('[vuex subStore] mutation错误', mutation)
        // 全局mutation
        if (action.length === 1) {
            const actionMutation = action[0]
            modules.mutations[actionMutation](STORE_STATE.state, _.cloneDeep(mutation.payload))
        }
        // 模块下的操作
        if (action.length > 1) {
            const actionModule = action[0]
            const actionMutation = action[1]
            if (!STORE_STATE.state[actionModule]) STORE_STATE.state[actionModule] = {}
            modules[actionModule].mutations[actionMutation](STORE_STATE.state[actionModule], _.cloneDeep(mutation.payload))
        }
    })
}
// 注册到vuex中
const store = new Vuex.Store({
    modules,
    plugins: [subStore],
})
```

然后修改子应用的观测对象

```js
Vue.observable(window.STORE_STATE)
```

至此，父子应用的共享状态树相互独立，互不影响。

### 简写。像 `mapState` 一样简写。

```js
export default {
    name: 'app',
    computed: {
        // 正常简写
        userInfo() {
            return STORE_STATE.state.app.userInfo
        }
        // 像 mapState 一样, 需要引入下面的 mapFatherState 方法
        ...mapFatherState('app', ['userInfo']),
        ...mapFatherState(['close']),
        // mapAction就不提供了，可自行处理，我比较喜欢 STORE.dispatch 这种方式调用。
    },
}

/**
 * 处理 vuex 的迁移
 * 像 mapState 一样, 需要引入下面的 mapFatherState 方法
 * ...mapFatherState('namespace', ['param']),
 * ...mapFatherState(['param']),
 */
export function mapFatherState(namespace, states) {
    const warn = (...tip) => console.warn('[mapFatherState]', ...tip)
    const isArray = Array.isArray(namespace)
    if (!namespace || !states && !isArray) {
        warn('传参错误', ...arguments)
        return {}
    }
    if (!isArray && !STORE_STATE.state[namespace]) {
        warn(`namespace ${namespace} 不存在`)
        return {}
    }
    let arr = isArray ? namespace : states
    return arr.reduce((acc, cur) => ((acc[cur] = () => isArray ? STORE_STATE.state[cur] : STORE_STATE.state[namespace][cur]), acc), {})
}
```

## Q&A

### Q: 路由切换时，微应用页面闪烁

已知 bug，解决方法：修改 `vue.config.js` 中 `css.extract` 改为 `false`，即不单独打包 css 样式文件，以 inline 形式加载，
从而避免闪烁:

```js
module.exports = {
    // ...
    css: {
        extract: false,
    },
}
```

### Q: 组件如何复用？

以 `/src/components/Ntable.vue` 为例，微应用想要复用此组件，可在 `package.json` 中，通过以下方式引用，`#test` 表示引入
`test` 分支代码。

```json
{
    "dependencies": {
        "vr5": "git+ssh://git@gitlab.naxions.com:xindao.wang/workbench.git",
        "vr5-dev": "git+ssh://git@gitlab.naxions.com:xindao.wang/workbench.git#test"
    }
}
```

然后 `import` 引入组件：

```js
import NTable from 'vr5/src/components/NTable'
Vue.component('NTable', NTable)
```

组件更新有些麻烦，通过 `yarn upgrade vr5` 方式更新经常报错，怀疑是升级小版本导致，目前我的方式是删除 `node_modules` 重新
安装依赖方式更新。

同时需要上传 `yarn.lock`，以保证 Jenkins 打包时正常更新包。

理论上可以引入项目中任何文件，但引入有依赖的文件时，需要保证依赖存在。

### Q: 左侧菜单渲染错误

更新：在 `mapp.config.js` 中直接配置 `target` 即可。以下为老版本方式。

约定：`mapp.config.js` 中配置的 `path` 同当前雅典娜的一级路径相同，如呼叫中心一级路径是 `/#/callCenter` 那对应的 `path`
应该是 `callCenter`

如因特殊原因需要单独配置，比如活动管理页面子应用 `path` 配置成 `activity-mng`，为了保证左侧菜单的正确性，需要修改
`/src/components/VMenu/index.vue` 文件中 `method.getSideTitle` 方法，可参考此方法中 `call-center` 的配置。

### Q: 加载子应用时，顶部、左侧菜单没了

是因为主应用、子应用都挂载到了 `#app` 上，导致子应用渲染到了根节点。

需要：

1. 修改子应用入口 `index.html` 中 `#app` 尽量起一个全局唯一的名字，参考命名：`mapp-${APP_NAME}-root`。
2. 修改 Vue mount 参数为第一步中的命名

### Q: Element-ui 组件样式错误

在 `src/assets/css/element.hack.scss` 公共样式文件中修改样式，注意要兼容 Vue2.x 和 3.x 版本的 UI。

这个问题是同时存在 Vue2.x 和 3.x 版本的 Element-ui 导致的样式冲突。暂时没有更好的解决方式，只有发现一个，解决一个。欢迎
提供更好的解决方案。
