class Sleep {
    async run(task) {
        const res = await task()
        return res
    }
}

function sleep(ms, val) {
    return new Promise(res => {
        setTimeout(() => {
            res(val)
        }, ms)
    })
}
const runner = new Sleep()
function addTask(ms, val) {
    runner.run(() => sleep(ms, val)).then(console.log)
}
addTask(3000, '1')
addTask(2000, '2')
addTask(1000, '3')
