// const lazyFun = lazy(2).add(2).top(console.log).delay(1000).multipy(3);
// // 此时不会输出任何东西

// setTimout(() => {
//     lazyFun.output();
// }, 1000);
// console.log('start');

// 输出内容
// 'start'
// 等待1000ms
// 4
// 4
// 等待1000ms
// 12

class Lazy2 {
    value
    queue = []
    constructor(value) {
        if (value) this.value = value
    }
    add(value) {
        this.queue.push(res => {
            res.value += value
            console.log('add', res.value)
        })
        return this
    }
    top(fn) {
        this.queue.push(res => {
            fn(res.value)
        })
        return this
    }
    sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    }
    delay(ms) {
        this.queue.push(async () => {
            await this.sleep(ms)
        })
        return this
    }
    multipy(value) {
        this.queue.push(res => {
            res.value *= value
            console.log('multipy', res.value)
        })
        return this
    }

    async output() {
        const cache = { value: this.value }
        for (let fn of this.queue) {
            const res = fn(cache)
            if (res?.then) await res
        }
    }
}

function lazy(v) {
    return new Lazy2(v)
}

const lazyFun = lazy(2).add(2).top(console.log).delay(1000).multipy(3)
// 此时不会输出任何东西

setTimeout(() => {
    lazyFun.output()
    lazyFun.output()
}, 1000)
console.log('start')
