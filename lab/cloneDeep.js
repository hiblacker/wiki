function cloneDeep(obj) {
    if (typeof obj !== 'object' || obj === null) return obj
    let result = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) result[key] = obj[key]
    }
    return result
}
