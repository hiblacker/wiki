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
 * @param {string} base64Data
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
 * @param {string} text 要测量的文字
 * @param {string} fontStyle 字体样式
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

## 获取 URL 参数

```js
/**
 * 获取url全部参数
 * @return {Object}
 */
export function getUrlVars() {
    var vars = {},
        hash
    var hashes = window.location.href
        .slice(window.location.href.indexOf('?') + 1)
        .split('&')
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=')
        vars[hash[0]] = hash[1]
    }
    return vars
}
```
## 格式化数字加单位
```js
/**
 * 格式化数字加单位
 * @param {number} num 数字
 * @return {string}
 */
export function numberFormat(num) {
    if (num < 10000) return num
    const n = num % 10000 === 0 ? 0 : 1
    return `${(num / 10000).toFixed(n)}万`
}
```

## 复制
```js
/**
 * @description 复制文字内容到剪切板，更多内容参见：https://www.zhangxinxu.com/wordpress/?p=10150
 * @author zhangxinxu(.com)
 * @created 2021-10-22
 */

export default function copyText(button, content, success) {
    if (!button) {
        return;
    }

    if (typeof content === 'function') {
        success = content;
        content = null;
    }

    success = success || function nope() {};

    // 是否降级使用
    let isFallback = !navigator.clipboard;

    if (typeof button === 'string' && !content) {
        if (content === false) {
            isFallback = true;
        }
        content = button;
        button = null;
    }

    let eleTextarea = document.querySelector('#tempTextarea');
    if (!eleTextarea && isFallback) {
        eleTextarea = document.createElement('textarea');
        eleTextarea.style.width = 0;
        eleTextarea.style.position = 'fixed';
        eleTextarea.style.left = '-999px';
        eleTextarea.style.top = '10px';
        eleTextarea.setAttribute('readonly', 'readonly');
        document.body.appendChild(eleTextarea);
    }

    function funCopy(text, callback) {
        callback = callback || function nope() {};

        if (!isFallback) {
            navigator.clipboard.writeText(text).then(
                () => {
                    callback();
                    // 成功回调
                    success(text);
                },
                () => {
                    // 禁止写入剪切板后使用兜底方法
                    copyText(text, false);
                    callback();
                    // 成功回调
                    success(text);
                },
            );

            return;
        }

        eleTextarea.value = text;
        eleTextarea.select();
        document.execCommand('copy', true);

        callback();
        // 成功回调
        success(text);
    }

    if (!button) {
        funCopy(content);
        return;
    }

    // 事件绑定
    button.addEventListener('click', (event) => {
        let strCopy = content;
        if (content && content.tagName) {
            strCopy = content.textContent || content.value;
        }
        // 复制的文字内容
        if (!strCopy) {
            return;
        }

        funCopy(strCopy, () => {
            // 复制成功提示
            const eleTips = document.createElement('span');
            eleTips.className = 'text-popup';
            eleTips.innerHTML = '复制成功';
            document.body.appendChild(eleTips);
            // 事件
            eleTips.addEventListener('animationend', () => {
                eleTips.parentNode.removeChild(eleTips);
            });
            // For IE9
            if (!window.history.pushState) {
                setTimeout(() => {
                    eleTips.parentNode.removeChild(eleTips);
                }, 1000);
            }
            eleTips.style.left = `${event.pageX - eleTips.clientWidth / 2}px`;
            eleTips.style.top = `${event.pageY - eleTips.clientHeight}px`;
        });
    });

    const strStyle = '.text-popup { animation: textPopup 1s both; -ms-transform: translateY(-20px); color: #01cf97; user-select: none; white-space: nowrap; position: absolute; z-index: 99; }@keyframes textPopup {0%, 100% { opacity: 0; } 5% { opacity: 1; } 100% { transform: translateY(-50px); }}';

    let eleStyle = document.querySelector('#popupStyle');
    if (!eleStyle) {
        eleStyle = document.createElement('style');
        eleStyle.id = 'popupStyle';
        eleStyle.innerHTML = strStyle;
        document.head.appendChild(eleStyle);
    }
}
```
