// @ts-nocheck
/**
 * 掘进 html 转 md
 */

var axios = require('axios')
const fs = require('fs')
const path = require('path')
const dirExists = require('../node-utils/dirExists')

const baseURL = 'https://api.juejin.cn/booklet_api/v1/'
const token = '?aid=2608&uuid=6899010964310705671&spider=0'
const headers = {
    authority: 'api.juejin.cn',
    origin: 'https://juejin.cn',
    'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
    cookie: '_ga=GA1.2.870520598.1606301165; __tea_cookie_tokens_2608=%257B%2522user_unique_id%2522%253A%25226899010964310705671%2522%252C%2522web_id%2522%253A%25226899010964310705671%2522%252C%2522timestamp%2522%253A1641886616276%257D; n_mh=bIMlR4mOB11LtSHLXT8RkkCXk5dh2DRKfd7KNT1dA8Q; sid_guard=c954f71ad89f2aee81514e9a04e65408%7C1655802493%7C31536000%7CWed%2C+21-Jun-2023+09%3A08%3A13+GMT; uid_tt=b924a53eb4bc97621d177fef96935a51; uid_tt_ss=b924a53eb4bc97621d177fef96935a51; sid_tt=c954f71ad89f2aee81514e9a04e65408; sessionid=c954f71ad89f2aee81514e9a04e65408; sessionid_ss=c954f71ad89f2aee81514e9a04e65408; sid_ucp_v1=1.0.0-KDliMDQ1NzkzN2NmZDRhYmI4MmEwZjlmYTRlNTA1YWY0ZjQyZjE0ZGIKFgiOrrC__fWBBxD9lMaVBhiwFDgIQAsaAmxmIiBjOTU0ZjcxYWQ4OWYyYWVlODE1MTRlOWEwNGU2NTQwOA; ssid_ucp_v1=1.0.0-KDliMDQ1NzkzN2NmZDRhYmI4MmEwZjlmYTRlNTA1YWY0ZjQyZjE0ZGIKFgiOrrC__fWBBxD9lMaVBhiwFDgIQAsaAmxmIiBjOTU0ZjcxYWQ4OWYyYWVlODE1MTRlOWEwNGU2NTQwOA; MONITOR_WEB_ID=ddea9416-5a33-4913-9faa-bab95be79c9f; _tea_utm_cache_2608={%22utm_source%22:%22web_nav%22}; _gid=GA1.2.1603810306.1664354417',
}
// _ga=GA1.2.870520598.1606301165; __tea_cookie_tokens_2608=%257B%2522user_unique_id%2522%253A%25226899010964310705671%2522%252C%2522web_id%2522%253A%25226899010964310705671%2522%252C%2522timestamp%2522%253A1641886616276%257D; n_mh=bIMlR4mOB11LtSHLXT8RkkCXk5dh2DRKfd7KNT1dA8Q; sid_guard=c954f71ad89f2aee81514e9a04e65408%7C1655802493%7C31536000%7CWed%2C+21-Jun-2023+09%3A08%3A13+GMT; uid_tt=b924a53eb4bc97621d177fef96935a51; uid_tt_ss=b924a53eb4bc97621d177fef96935a51; sid_tt=c954f71ad89f2aee81514e9a04e65408; sessionid=c954f71ad89f2aee81514e9a04e65408; sessionid_ss=c954f71ad89f2aee81514e9a04e65408; sid_ucp_v1=1.0.0-KDliMDQ1NzkzN2NmZDRhYmI4MmEwZjlmYTRlNTA1YWY0ZjQyZjE0ZGIKFgiOrrC__fWBBxD9lMaVBhiwFDgIQAsaAmxmIiBjOTU0ZjcxYWQ4OWYyYWVlODE1MTRlOWEwNGU2NTQwOA; ssid_ucp_v1=1.0.0-KDliMDQ1NzkzN2NmZDRhYmI4MmEwZjlmYTRlNTA1YWY0ZjQyZjE0ZGIKFgiOrrC__fWBBxD9lMaVBhiwFDgIQAsaAmxmIiBjOTU0ZjcxYWQ4OWYyYWVlODE1MTRlOWEwNGU2NTQwOA; MONITOR_WEB_ID=ddea9416-5a33-4913-9faa-bab95be79c9f; _tea_utm_cache_2608={%22utm_source%22:%22web_nav%22}; _gid=GA1.2.1603810306.1664354417

const HTTP = axios.create({
    baseURL,
    method: 'post',
    headers,
})

// 小册目录
const list = `booklet/get`
// 章节详情
const url = `section/get`

// TypeScript 类型体操通关秘籍
// const booklet_id = '7047524421182947366'
// JavaScript 设计模式核⼼原理与应⽤实践
// const booklet_id = '6844733790204461070'
// 前端算法与数据结构面试：底层逻辑解读与大厂真题训练
const booklet_id = '6844733800300150797'

// 获取所有章节
function getAll() {
    HTTP({ url: list + token, data: { booklet_id } }).then(async ({ data }) => {
        console.log(data)
        // 写readme
        saveReadme(data.data.introduction.content)
        const sections = data.data.sections
        for (let k in data.data.sections) {
            const item = sections[k]
            await sleep(1000)
            saveArticle(item.section_id, +k + 1)
        }
    })
}

// 保存readme
function saveReadme(content) {
    fs.writeFile(__dirname + `/README.md`, content, err => {
        if (err) {
            console.error(err)
            return
        }
        console.log('readme', '文件写入成功')
    })
}

const basePath = path.resolve('./juejin/course/')

// 保存章节
function saveArticle(section_id, k) {
    return HTTP({ url: url + token, data: { section_id } }).then(async ({ data }) => {
        const title = data.data.section.title
        const md = `# ${title} \n\n` + data.data.section.markdown_show.replace(/\\/g, '')
        if (!md) {
            debugger
            console.log(data.data.section)
        }
        // 保存md
        const path1 = `${basePath}/markdown`
        await dirExists(path1)
        fs.writeFile(`${path1}/${k}. ${title}.md`, md, err => {
            if (err) {
                console.error(err)
                return
            }
            console.log(title, 'md写入成功')
        })
        // 保存html
        const path2 = `${basePath}/html`
        await dirExists(path2)
        fs.writeFile(`${path2}/${k}. ${title}.md`, data.data.section.content, err => {
            if (err) {
                console.error(err)
                return
            }
            console.log(title, 'html写入成功')
        })
    })
}

const sleep = t => new Promise(r => setTimeout(r, t))

getAll()

// 7061543892180533283
// saveArticle('7048282594408366084', 1)
