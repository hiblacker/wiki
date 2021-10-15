---
navbar: false
sidebarDepth: 2
sidebar: auto
---

# 前端技术分享

大家下午好，很荣幸在这里跟大家做一次前端技术分享，大部分人应该都已经很熟悉我了，考虑到有新入职的同事，还是简单做一下自我介绍，我叫董庆文，来自辽宁营口鲅鱼圈，一座美丽的滨海城市 🌴，有想去小众海边城市旅游的同学可以找我或者宇哥详细了解一下 🍻，欢迎大家来我的家乡游玩。

![鲅鱼圈](https://cdn.superwen.cn/halo/d1c7dbbc05e9d8803240946d07a6a109.jpg)

我目前所在的作战单元是微信工作台和运营活动。


## 分享清单

### 1. Promise

-   实现 Promise
-   封装 Promise
-   Promise 应用
-   项目中 Promise 优化

### 2. Alfred

Mac 必备神器，主要介绍快捷键、快捷方式、剪切板、全局搜索（文件、书签）、有道


## Promise

<!-- OK接下来进入今天的主题，大家再熟悉不过了，主要解决了回调地狱问题，增强了代码可读性，让异步代码更加可靠 -->
<img src='https://cdn.superwen.cn/halo/04fff36952d164343e9d006f4fc5531a.jpg' style='width: 500px;display:block;margin:0 auto' />

### 实现 Promise

我们想要手写一个 Promise，就要遵循 [Promise/A+](https://promisesaplus.com/) 规范，目前业界所有 Promise 的类库都遵循这个规范。


#### Promise/A+ 规范

1. `new Promise` 时，需要传递一个 `executor` 执行器，执行器立刻执行
2. `executor` 接受两个参数，分别是 `resolve` 和 `reject`
3. `promise` 只能从 `pending` 到 `rejected`, 或者从 `pending` 到 `fulfilled`
4. `promise` 的状态一旦确认，就不会再改变
5. `promise` 都有 `then` 方法，`then` 接收两个参数，成功的回调 `onFulfilled`、失败的回调 `onRejected`
6. 如果调用 `then` 时，`promise` 已经成功，则执行 `onFulfilled`，并将 `promise` 的值作为参数传递进去。
   如果 `promise` 已经失败，那么执行 `onRejected`, 并将 `promise` 失败的原因作为参数传递进去。
   如果 `promise` 的状态是 `pending`，需要将 `onFulfilled` 和 `onRejected` 函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
7. `then` 的参数 `onFulfilled` 和 `onRejected` 可以缺省
8. `promise` 可以 `then` 多次，`promise` 的 `then` 方法返回一个 `promise`
9. 如果 `then` 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个 `then` 的成功的回调(`onFulfilled`)
10. 如果 `then` 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 `then` 的失败的回调(`onRejected`)
11. 如果 `then` 返回的是一个 `promise`,那么需要等这个 `promise` 执行完，成功就走下一个 `then` 的成功，失败，就走下一个 `then` 的失败

```js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
function iPromise(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilled = []
    this.onRejected = []

    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }

    const self = this
    function resolve(value) {
        setTimeout(() => {
            if (self.status !== PENDING) return
            self.status = FULFILLED
            self.value = value
            self.onFulfilled.forEach(fn => fn(value))
        })
    }

    function reject(reason) {
        setTimeout(() => {
            if (self.status !== PENDING) return
            self.status = REJECTED
            self.reason = reason
            self.onRejected.forEach(fn => fn(reason))
        })
    }
}

iPromise.prototype.then = function (onFulfilled, onRejected) {
    if (this.status === PENDING) {
        return new iPromise((resolve, reject) => {
            try {
                this.onFulfilled.push(val => {
                    let x = onFulfilled(val)
                    if (x && x.then) x.then(resolve)
                    else resolve(x)
                })
                onRejected && this.onRejected.push(onRejected)
            } catch (error) {
                return reject(error)
            }
        })
    }
}
```


### 封装 Promise

#### 1.sleep


#### 2. Promise.resolve

```js
// 军团
getArmyGroupOptions({ state, commit }) {
    const KEY = 'legion'
    const url = '/conceptAdvance/client/department/list'
    const data = { department: '军团' }
    if (state.options[KEY]) return Promise.resolve(state.options[KEY])
    return HTTP({ url, data }).then(res => {
        const list = res.data
            .map(i => ({ label: i.name, value: i.id }))
            .concat([{ label: '其它', value: '-1' }])
        commit('setOptions', { [KEY]: list })
        return list
    })
},
```


#### 3. asyncWithLoading

```js
fn(){
    let params = {...this.page}
    this.collectLoading = true
    knowledgeCollect(params).then(res => {
        this.collectLoading = false
        this.contentList = res && res.content ? res.content : []
    }).catch(() => {
        this.collectLoading = false
    })
}
```

<details><summary>使用 asyncWithLoading 后</summary>

```js
fn(){
    let params = {...this.page}
    asyncWithLoading(knowledgeCollect(params)).then(res => {
        this.contentList = res && res.content ? res.content : []
    })
}



/**
 * 异步请求自动设置 loading
 * 目的是用于请求接口的时候，不需要手写 loading 状态的改变
 * @param {Function} fn 异步函数
 * @param {String} loadingKey loading字段
 */
asyncWithLoading(fn, loadingKey = 'nLoading') {
    this[loadingKey] = true
    let p = fn
    if (typeof p === 'function') p = fn()
    return p.finally(() => (this[loadingKey] = false))
}
```

</details>


### 实例：数据异步依赖
问题：我需要xxx数据，它不在我的页面获取，但我的页面先加载了。

举例：（企业）微信登录 -> userid -> 请求接口 -> 渲染页面

解决方法：重复请求、watch监听、中转页（登录页）。。。

wecom-sidebar: 话术列表、客户详情、工单中心

### 实例：具体代码优化

1. `vm.loadingCreate = true`
2. `console.log("queryAllKeywords",res)`


## Alfred
[下载地址](https://d5.52mac.com/873050/Alfred_4_v4.3.4_cxpo.dmg)

- 快捷键
- 快捷方式(vscode)
- 剪切板(片段)
- 全局搜索（文件、书签）
- 有道
- encode
- shell
- 上传图片


唯一限制的，是你的想象力和执行力
