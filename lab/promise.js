MyPromise.all = function (tasks) {
    return new Promise(function (resolve, reject) {
        const res = []
        tasks.forEach(function (task) {
            Promise.resolve(task)
                .then(function (val) {
                    res.push(val)
                    if (res.length == tasks.length) resolve(res)
                })
                .catch(reject)
        })
    })
}

function MyPromise(executor) {
    this.status = 'pending'
    this.reason = null
    this.value = null
    this.successCallbacks = []
    this.failCallbacks = []
    const resolve = value => {
        if (this.status === 'pending') {
            this.status = 'fulfilled'
            this.value = value
            this.successCallbacks.forEach(cb => cb())
        }
    }
    const reject = reason => {
        if (this.status === 'pending') {
            this.status = 'rejected'
            this.reason = reason
            this.failCallbacks.forEach(cb => cb())
        }
    }
    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }
}


MyPromise.prototype.then = function (onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
        onRejected = typeof onRejected === 'function' ? onRejected : v => {throw v}
        if (this.status === 'rejected') {
            setTimeout(() => {
                let x = onRejected(this.reason)
                reject(x)
            });
        }
        if (this.status === 'fulfilled') {
            setTimeout(() => {
                let x = onFulfilled(this.value)
                resolve(x)
            });
        }
        if (this.status === 'pending') {
            this.failCallbacks.push(() => {
                setTimeout(() => {
                    let x = onRejected(this.reason)
                    reject(x)
                });
            })
            this.successCallbacks.push(() => {
                setTimeout(() => {
                    let x = onFulfilled(this.value)
                    resolve(x)
                });
            })
        }
    })
}

MyPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}

new MyPromise((res, rej) => {
    console.log(1)
    // rej(3)
    res(2)
    setTimeout(() => {
        res(1)
    })
}).then(console.log, console.error)

// const a = Promise.resolve(11)
// const b = Promise.reject(22)
// Promise.all([a,b]).then(console.log)

// MyPromise.all([a,b]).then(console.log).catch(console.error)
