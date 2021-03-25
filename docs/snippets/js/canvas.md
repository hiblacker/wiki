# Canvas 常用方法

## Canvas 圆角矩形

```js
// 绘制圆角矩形
function roundedRect(ctx, x, y, width, height, radius) {
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(x, y + radius)
    ctx.lineTo(x, y + height - radius)
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
    ctx.lineTo(x + width - radius, y + height)
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
    ctx.lineTo(x + width, y + radius)
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
    ctx.lineTo(x + radius, y)
    ctx.quadraticCurveTo(x, y, x, y + radius)
    ctx.stroke()
    ctx.restore()
}
```

## Canvas 文本换行绘制

```js
/**
 * 文本换行绘制
 * @param {String} context Canvas 上下文
 * @param {String} text 绘制文本
 * @param {Number} x 起点x
 * @param {Number} y 起点y
 * @param {String} maxWidth Canvas 上下文
 * @param {Number} lineHeight 行高
 * @param {String} row 最多行数，超出显示...，可不限制
 * @return {Number} 文本高度
 */
textEllipsis(context, text, x, y, maxWidth, lineHeight, row) {
    if (typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
        console.error('参数有误')
        return
    }
    var canvas = context.canvas

    if (typeof maxWidth == 'undefined') {
        maxWidth = (canvas && canvas.width) || 300
    }

    if (typeof lineHeight == 'undefined') {
        // 有些情况取值结果是字符串，比如 normal。所以要判断一下
        var getLineHeight = window.getComputedStyle(canvas).lineHeight
        var reg = /^[0-9]+.?[0-9]*$/
        lineHeight = reg.test(getLineHeight) ? getLineHeight : 20
    }

    // 字符分隔为数组
    var arrText = text.split('')
    // 文字最终占据的高度，放置在文字下面的内容排版，可能会根据这个来确定位置
    var textHeight = 0
    // 每行显示的文字
    var showText = ''
    // 控制行数
    var limitRow = row
    var rowCount = 0

    for (var n = 0; n < arrText.length; n++) {
        var singleText = arrText[n]
        var connectShowText = showText + singleText
        // 没有传控制的行数，那就一直换行
        var isLimitRow = limitRow ? rowCount === limitRow - 1 : false
        var measureText = isLimitRow ? connectShowText + '…' : connectShowText
        var metrics = context.measureText(measureText)
        var textWidth = metrics.width

        if (textWidth > maxWidth && n > 0 && rowCount !== limitRow) {
            var canvasShowText = isLimitRow ? measureText : showText
            context.fillText(canvasShowText, x, y)
            showText = singleText
            y += lineHeight
            textHeight += lineHeight
            rowCount++
            if (isLimitRow) {
                break
            }
        } else {
            showText = connectShowText
        }
    }
    if (rowCount !== limitRow) {
        context.fillText(showText, x, y)
    }

    var textHeightValue = rowCount < limitRow ? textHeight + lineHeight : textHeight
    return textHeightValue
}
```
