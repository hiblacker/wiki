function quickSort(arr) {
    const len = arr.length
    if (len <=1 ) return [...arr]
    const left = []
    const right = []
    const half = arr.splice(~~len/2, 1)
    for(let i of arr) {
        if (i > half) right.push(i)
        else left.push(i)
    }
    return [...quickSort(left).concat([half], quickSort(right))]
}


console.log(quickSort([8,5,7,7,4,232,3,5,67,8,7,4,3,3]).toString())
