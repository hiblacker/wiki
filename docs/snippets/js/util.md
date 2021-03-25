# 常用 JS 方法

## 时间格式化

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
export function timeFormat(fmt = 'yyyy-MM-dd hh:mm:ss.S') {
    let time = fmt
    const rules = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds(),
    }
    if (/(y+)/.test(time)) {
        time = time.replace(
            RegExp.$1,
            String(this.getFullYear()).substr(4 - RegExp.$1.length)
        )
    }

    Object.keys(rules).forEach(k => {
        if (new RegExp(`(${k})`).test(time)) {
            time = time.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                    ? rules[k]
                    : `00${rules[k]}`.substr(String(rules[k]).length)
            )
        }
    })

    return time
}
```

## Base64 图片转二进制（Blob）

```js
/**
 * Base64 图片转二进制（Blob）
 * @param {String} base64Data
 * @return {Blob}
 */
function dataURItoBlob(base64Data) {
    var byteString
    if (base64Data.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(base64Data.split(',')[1])
    else byteString = unescape(base64Data.split(',')[1])
    var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]
    var ia = new Uint8Array(byteString.length)
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ia], { type: mimeString })
}

// 转 FormData 上传
const formData = new FormData()
formData.append('file', dataURItoBlob(img), 'image.png')
axios({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: `${process.env.BASE_API}/upload`,
    method: 'post',
    data: formData,
})
```

## 测量文字宽度

```js
/**
 * 测量DOM文字宽度
 * @param {String} text 要测量的文字
 * @param {String} fontStyle 字体样式
 * @return {Number}
 */
function getTextWith(text, fontStyle = '16px') {
    var canvas = document.createElement('canvas')
    var context = canvas.getContext('2d')
    context.font = fontStyle
    var dimension = context.measureText(text)
    return dimension.width
}
var textWidth = getTextWith('This is my dog!', '14px/1.6 "Microsoft Yahei"')
console.log(textWidth)
```
