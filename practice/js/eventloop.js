setTimeout(() => {
    console.log(1)
}, 0)

new Promise((resolve, reject) => {
    console.log(2)

    resolve('p1')

    new Promise((resolve, reject) => {
        console.log(3)

        setTimeout(() => {
            resolve('setTimeout2')

            console.log(4)
        }, 0)

        resolve('p2')
    }).then(data => {
        console.log(data)
    })

    setTimeout(() => {
        resolve('setTimeout1')

        console.log(5)
    }, 0)
}).then(data => {
    console.log(data)
})

console.log(6)

// 2 3 6 p2 p1 1 4 5
