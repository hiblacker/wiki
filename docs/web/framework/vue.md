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

## 通过 JS 命令式调用并挂载 Vue 组件

比如当我们想要点击按钮，展示弹窗操作，通常会将弹窗组件抽离，然后引入弹窗组件，设置组件状态、绑定数据，逻辑过于分散。不够优雅。

这里通过 JS 引用组件并挂载 DOM。这样可以将逻辑聚合在一个 function 中。同时对于调用者非常友好，只需调用方法，传入所需参数即可。

多人协作时，非常便捷好用。

### Vue2

JS 中挂载调用：

```js
import Vue from 'vue'
import ManageToast from './widget/ManageToast.vue'
function showManage() {
    const ManageToastConstructor = Vue.extend(ManageToast)
    let instance = new ManageToastConstructor({
        data: {
            id: 111,
        },
        methods: {
            close() {
                instance.dialogVisible = false
                setTimeout(() => {
                    document.body.removeChild(instance.$el)
                    instance = null
                }, 800)
            },
        },
    })
    instance.$mount()
    document.body.appendChild(instance.$el)
    instance.dialogVisible = true
}
```

Vue 组件：

```vue
<template>
    <el-dialog
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="close"
        custom-class="normal-dialog"
    >
        <span>这是一段信息 {{ id }}</span>
    </el-dialog>
</template>

<script>
export default {
    name: 'ManageToast',
    data() {
        return {
            id: null,
            dialogVisible: false,
        }
    },
}
</script>
```
