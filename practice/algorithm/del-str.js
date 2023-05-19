// 去除字符串中出现次数最少的字符，不改变原字符串的顺序。

// ababac —— ababa
// aaabbbcceeff —— aaabbb

function delLessStr(str) {
    const arr = str.split('')
    const cache = arr.reduce((acc, i) => {
        acc[i] ? acc[i]++ : (acc[i] = 1)
        if (acc[i]) acc[i]++
        else acc[i] = 1
        return acc
    }, {})
    let min = cache[arr[0]]
    let target = []
    Object.keys(cache).forEach(key => {
        if (cache[key] == min) {
            target.push(key)
        }
        if (cache[key] < min) {
            min = cache[key]
            target = [key]
        }
    })
    console.log(min, target)
    return arr.filter(i => !target.includes(i)).join('')
}

console.log(delLessStr('ababac'))
