/**
 * 快速排序
 * 选中基准点，小放左，大放右，递归排序
 */

function quickSort(arr) {
    if (!Array.isArray(arr)) throw new Error('Not Array')
    if (arr.length <= 1) return arr
    const index = ~~(arr.length / 2)
    const pivot = arr.splice(index, 1)[0]
    const left = []
    const right = []
    arr.forEach(i => {
        if (i > pivot) right.push(i)
        else left.push(i)
    })
    return quickSort(left).concat([pivot], quickSort(right))
}
console.log(quickSort([3, 2, 4, 6, 8, 6, 4, 3, 5, 7, 89, 95, 4, 3]))

try {
    new Promise(res => {
        res(1)
    }).then(r => {
        const a = 1
        a = 2
    })
} catch (error) {
    console.log(1, error)
}
