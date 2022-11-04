// @ts-nocheck
/**
 * 掘进 html 转 md
 */

var TurndownService = require('turndown')
var axios = require('axios')
const fs = require('fs')
const path = require('path')
var encoding = require('encoding')

var turndownService = new TurndownService()
const url = 'https://juejin.cn/post/7088144745788080142'
axios.get(url).then(res => {
    // console.log(res.data)
    let source = res.data
    // 如果是掘金的文章
    if (url.match(/^(https?:\/\/)?juejin.cn/)) source = handleJuejinArticle(source)
    console.log(source)
    const md = turndownService.turndown(source)
    console.log(md)
    fs.writeFile(__dirname + '/test.md', md, err => {
        if (err) {
            console.error(err)
            return
        }
        console.log('文件写入成功')
    })
    fs.writeFile(__dirname + '/source.html', res.data, err => {
        if (err) {
            console.error(err)
            return
        }
        console.log('文件写入成功')
    })
})

function handleJuejinArticle(source) {
    return encoding
        .convert(source.match(/mark_content:"(.*)",display_count/), 'utf8')
        .toString('utf8')
}
