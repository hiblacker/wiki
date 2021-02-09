# utils

## 时间

```js
/**
 * 时间格式化
 *
 * @param {string} fmt 格式化类型
 *
 * 使用:
 * Date.prototype.Format = timeFormat
 * new Date().Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 */
export function timeFormat(fmt = "yyyy-MM-dd hh:mm:ss.S") {
    let time = fmt;
    const rules = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds(),
    };
    if (/(y+)/.test(time)) {
        time = time.replace(
            RegExp.$1,
            String(this.getFullYear()).substr(4 - RegExp.$1.length)
        );
    }

    Object.keys(rules).forEach((k) => {
        if (new RegExp(`(${k})`).test(time)) {
            time = time.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                    ? rules[k]
                    : `00${rules[k]}`.substr(String(rules[k]).length)
            );
        }
    });

    return time;
}
```
