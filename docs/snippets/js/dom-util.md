# DOM utils

## 测量文字宽度

```js
/**
 * 测量文字宽度
 * @param {String} title 要测量的文字
 * @param {Object} css 文字样式
 * @return {Number} 宽度
 */
function measure(title, css) {
    let div = document.createElement('div')
    div.innerHTML = title
    const style = {
        position: 'fixed',
        left: '0',
        top: '0',
        visibility: 'hidden',
        ...css,
    }
    Object.keys(style).forEach(key => {
        div.style[key] = style[key]
    })
    document.body.appendChild(div)
    const w = div.clientWidth
    document.body.removeChild(div)
    div = null
    return w
}
```
