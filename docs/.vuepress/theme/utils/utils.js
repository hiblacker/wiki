/**
 * 相对时间
 * @param {number | Date} time 日期对象或者时间戳
 * @return {string} 返回相对时间
 */
export function getRelativeTime(time) {
    const t = +new Date(time)
    const now = +new Date()
    const passed = (now - t) / 1000 / 60
    const passedYear = passed / (365 * 24 * 60)
    if (passedYear >= 1) return `${~~passedYear}年前`
    const passedM = passed / (30 * 24 * 60)
    if (passedM >= 1) return `${~~passedM}月前`
    const passedD = passed / (24 * 60)
    if (passedD >= 1) return `${~~passedD}天前`
    const passedH = passed / 60
    if (passedH >= 1) return `${~~passedH}小时前`
    if (passed >= 1) return `${~~passed}分钟前`
    if (passedM >= 0) return '刚刚'
    return time.toString()
}
