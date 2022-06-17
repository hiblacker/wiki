# 最佳实践

## Vue3 中，Vuex 的 action 如何访问全局 Vue 实例？

1. 将实例挂载到 `store` 上
2. `action` 中 `this` 可以访问

```js
import { createApp } from 'vue'
import { createStore } from 'vuex'
const app = createApp(App)
const store = createStore({
    actions: {
        test() {
            console.log(this._vm)
        },
    },
})
store._vm = app
```
