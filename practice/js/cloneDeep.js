/**
 * 深拷贝
 */

// 解决调用自身问题
const cache = new Map()
function cloneDeep(obj) {
    if (cache.get(obj)) return cache.get(obj)
    let res = obj
    if (Array.isArray(obj)) {
        res = obj.map(cloneDeep)
    }
    if (typeof obj === 'function') {
        res = function() {
            return obj.call(this, ...arguments)
        }
    }
    if (obj instanceof RegExp) res = new RegExp(obj.source, obj.flags)
    if (obj instanceof Date) res = new Date(obj)
    if (typeof obj === 'object') {
        const newObj = {}
        Object.keys(obj).forEach(key => {
            newObj[key] = cloneDeep(obj[key])
        })
        res = newObj
    }
    cache.set(obj, res)
    return res
}

const log = v => console.log(JSON.stringify(v, null, 2))
const obj = {
    a: 1,
    b() {
        console.log(1)
    },
}
const o2 = cloneDeep(obj)
o2.b = function() {console.log(2)}
log(o2.b())
log(obj.b())
