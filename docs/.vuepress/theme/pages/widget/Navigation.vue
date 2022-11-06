<template lang="pug">
.Navigation
    .group(v-for='item in groups', :key='item.title')
        h4.title(v-if='item.title') {{ item.title }}
        .navs
            a.nav(v-for='i in item.navs', :key='i.url', :href='i.url')
                .info
                    i.emoji(v-if='i.emoji') {{ i.emoji }}
                    img.icon(v-else, :src='i.icon')
                    .tit {{ i.name }}
                .desc(v-if='i.desc') {{ i.desc }}
</template>

<script>
const base64s = {
    wechat: "data:image/svg+xml;charset=UTF-8,%3csvg width='36' height='36' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M27.4362985 16.6454925c-.7072239 1.1607165-1.8835821 2.0505075-3.2927761 2.4601791-.0354627.0102687-.0705672.0212538-.1062687.0309254-.2176716.0618508-.4409552.0997015-.6622089.0997015-.9763582 0-1.5276418-.6594627-1.2315224-1.4730746.216597-.5949851.785194-1.097194 1.4791642-1.3296717 1.0755821-.3922388 1.8271044-1.2868059 1.8271044-2.3277612 0-1.4026268-1.3645373-2.5397014-3.0476417-2.5397014-1.6832239 0-3.0476418 1.1370746-3.0476418 2.5397014v7.788418c0 1.8730746-1.0852538 3.515582-2.709015 4.4445373-.8851343.506388-1.9277612.8040597-3.0475224.8040597-3.1743283 0-5.75665667-2.3545075-5.75665667-5.248597 0-.9211941.26340299-1.7863881.72238806-2.5397015.71032836-1.1658508 1.89397011-2.0586269 3.31164181-2.4656717.001194-.0003582.0022686-.0007164.0034627-.0010746.2390447-.0743881.4869253-.1157015.7313433-.1157015.9806567 0 1.5345671.6625672 1.2371343 1.4797612-.2015523.553791-.7443582 1.0306866-1.377194 1.2844179-.0755821.025194-.1491344.0534925-.2217314.0833433-1.0052537.4150448-1.6980298 1.2762985-1.6980298 2.2746269 0 1.4026268 1.3644179 2.539582 3.0476417 2.539582 1.6831045 0 3.0475224-1.1369552 3.0475224-2.539582v-7.788418c0-1.873194 1.0851344-3.515582 2.709015-4.44465667.8851343-.50638806 1.9277612-.8040597 3.0476418-.8040597 3.1742089 0 5.7566567 2.35450747 5.7566567 5.24871637 0 .9210747-.2635224 1.7863881-.7225075 2.5397015M18 2C9.16346269 2 2 9.16346269 2 18c0 8.8365373 7.16346269 16 16 16 8.8365373 0 16-7.1634627 16-16 0-8.83653731-7.1634627-16-16-16' fill='%2307C160' fill-rule='evenodd'/%3e%3c/svg%3e",
    element:
        'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjMwcHgiIGhlaWdodD0iMzBweCIgdmlld0JveD0iMCAwIDM4IDQ4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0MCAoMzM3NjIpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPlNoYXBlIENvcHk8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0idjIuMi4wIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i6aaW6aG1Lem7mOiupOaViOaenC1jb3B5LTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MC4wMDAwMDAsIC0xOS4wMDAwMDApIiBmaWxsPSIjNDA5RUZGIj4KICAgICAgICAgICAgPHBhdGggZD0iTTIxMi4xMzU0NDEsNDUuMTU3ODA3NyBaIE0xMDMuNDE2NTAyLDQ2LjIxNzU1MTEgQzEwMy40MDcwMDgsNDcuNzk0NTY4MiAxMDIuNTg3ODQxLDQ4LjE0NjM0NzQgMTAyLjU4Nzg0MSw0OC4xNDYzNDc0IEMxMDIuNTg3ODQxLDQ4LjE0NjM0NzQgODguNDUyMDQ3OCw1Ni4zMTQ1MDg3IDg3LjUzMjk5NTYsNTYuODI2Mjc1MSBDODYuNjIyMzM2LDU3LjIxNzE1NjEgODYuMDEzNjcwMyw1Ni44MjYyNzUxIDg2LjAxMzY3MDMsNTYuODI2Mjc1MSBDODYuMDEzNjcwMyw1Ni44MjYyNzUxIDcxLjIyMjU3MDYsNDguMjQ3OTU3MiA3MC42ODI2OTYyLDQ3Ljg3MDg0NDQgQzcwLjE0MjY4NDMsNDcuNDkzNzMxNiA3MC4xMzAxNjQzLDQ2LjkwNjM3NzQgNzAuMTMwMTY0Myw0Ni45MDYzNzc0IEM3MC4xMzAxNjQzLDQ2LjkwNjM3NzQgNzAuMTQ1MDIzMiwyOS45MTk5MTc0IDcwLjEzMDE2NDMsMjkuMTMzMzM2NCBDNzAuMTE1MzA1MywyOC4zNDY2MTc3IDcxLjA5Njk1NzYsMjcuNzU1NTQ2MSA3MS4wOTY5NTc2LDI3Ljc1NTU0NjEgTDg1Ljg3NTUzNzMsMTkuMjEzNDM4NyBDODYuNzg1MzcxNCwxOC43MzMyMDE2IDg3LjY3MTEyODYsMTkuMjEzNDM4NyA4Ny42NzExMjg2LDE5LjIxMzQzODcgQzg3LjY3MTEyODYsMTkuMjEzNDM4NyAxMDAuNzI2NjIzLDI2LjgwMjA5MzcgMTAyLjE3MzQ0MiwyNy42MTc3MjU3IEMxMDMuNTkxNTA3LDI4LjI5MTk1NzcgMTAzLjQxNjUwMiwyOS42ODQzNDI0IDEwMy40MTY1MDIsMjkuNjg0MzQyNCBDMTAzLjQxNjUwMiwyOS42ODQzNDI0IDEwMy40MjUzMDcsNDQuNzUxOTE5MiAxMDMuNDE2NTAyLDQ2LjIxNzU1MTEgTDEwMy40MTY1MDIsNDYuMjE3NTUxMSBaIE05Ny41MTYwMTA1LDI5LjE2OTEzMzkgQzk0LjQ5MDAxNzMsMjcuNDI3NDQ4MyA4Ny4zNjE1ODQyLDIzLjI5NzEwNjMgODcuMzYxNTg0MiwyMy4yOTcxMDYzIEM4Ny4zNjE1ODQyLDIzLjI5NzEwNjMgODYuNjY2MTAzOSwyMi45MjEyMzI2IDg1Ljk1MTc3NDcsMjMuMjk3MTA2MyBMNzQuMzQ4NzQwNiwyOS45ODIxNSBDNzQuMzQ4NzQwNiwyOS45ODIxNSA3My41NzgwMDI1LDMwLjQ0NDkwMTQgNzMuNTg5Njk3LDMxLjA2MDQ4MDUgQzczLjYwMTM5MTUsMzEuNjc2MDU5NyA3My41ODk2OTcsNDQuOTY5ODcwOCA3My41ODk2OTcsNDQuOTY5ODcwOCBDNzMuNTg5Njk3LDQ0Ljk2OTg3MDggNzMuNTk5NDY1NCw0NS40Mjk1OTMyIDc0LjAyMzQ5NTEsNDUuNzI0NjQ3MiBDNzQuNDQ3Mzg3Myw0Ni4wMTk3MDExIDg2LjA2MDE4OTgsNTIuNzMzMjQ1MSA4Ni4wNjAxODk4LDUyLjczMzI0NTEgQzg2LjA2MDE4OTgsNTIuNzMzMjQ1MSA4Ni41MzgxNTIsNTMuMDM5MTc1OSA4Ny4yNTMwMzE1LDUyLjczMzI0NTEgQzg3Ljk3NDY1MjYsNTIuMzMyNzI2MiA5OS4wNzMwMzM1LDQ1Ljk0MDI1ODIgOTkuMDczMDMzNSw0NS45NDAyNTgyIEM5OS4wNzMwMzM1LDQ1Ljk0MDI1ODIgOTkuNzE2MjMyNSw0NS42NjQ4OTI5IDk5LjcyMzY2MTksNDQuNDMwNzA1NiBDOTkuNzI1NzI1Nyw0NC4wNzQ3OTU5IDk5LjcyNjU1MTIsNDIuNjkzMjg4MSA5OS43MjY2ODg3LDQwLjk1NzUyMjkgTDg2LjY2MDA1MDIsNDguODc1MjM5NCBMODYuNjYwMDUwMiw0NS44NDYyMjEgQzg2LjY2MDA1MDIsNDQuNjAyMTIwNSA4Ny42MjMxMjg5LDQzLjc4MDk4MTEgODcuNjIzMTI4OSw0My43ODA5ODExIEw5OS4xODA3NjA3LDM2LjgxNjU3OTMgQzk5LjYxNjg5NzgsMzYuMzYxMTI1MSA5OS43MDY4NzY4LDM1LjYzMTU0NDcgOTkuNzI1NDUwNSwzNS4zNTU2Mjg3IEM5OS43MjUwMzc4LDM0LjA5MDQ2MjcgOTkuNzI0NDg3NCwzMi45ODUyODQxIDk5LjcyNDA3NDcsMzIuMjg1MTY3OCBMODYuNjYwMDUwMiw0MC4yMDEyMzIxIEw4Ni42NjAwNTAyLDM3LjAzNDUzMSBDODYuNjYwMDUwMiwzNS43OTA0MzA1IDg3LjQ4NTU0NjIsMzUuMjQ0NjU2NCA4Ny40ODU1NDYyLDM1LjI0NDY1NjQgTDk3LjUxNjAxMDUsMjkuMTY5MTMzOSBaIiBpZD0iU2hhcGUtQ29weSI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+',
}
export default {
    name: 'Navigation',
    data() {
        return {
            groups: [
                {
                    title: '',
                    navs: [
                        {
                            name: '稀土掘金',
                            url: 'https://juejin.cn',
                            icon: 'https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/gold.981a5510.svg',
                        },
                        {
                            name: '知乎',
                            url: 'https://zhihu.com',
                            icon: 'https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/gold.981a5510.svg',
                        },
                    ],
                },
                {
                    title: '文档',
                    navs: [
                        {
                            name: '小程序开发文档',
                            url: 'https://developers.weixin.qq.com/miniprogram/dev/framework/',
                            icon: base64s.wechat,
                        },

                        {
                            name: '企业微信SDK文档',
                            url: 'https://work.weixin.qq.com/api/doc/90000/90136/90512',
                            icon: 'https://cdn.superwen.cn/assets/wecom.webp',
                        },
                    ],
                },
                {
                    title: 'Vue',
                    navs: [
                        {
                            name: 'Vue.js',
                            url: 'https://cn.vuejs.org/v2/guide/',
                            icon: 'https://cdn.superwen.cn/halo/cf23526f451784ff137f161b8fe18d5a.png',
                        },
                        {
                            name: 'Vue Router',
                            url: 'https://router.vuejs.org/zh/guide/',
                            icon: 'https://cdn.superwen.cn/halo/cf23526f451784ff137f161b8fe18d5a.png',
                        },
                        {
                            name: 'Vuex',
                            url: 'https://vuex.vuejs.org/zh/',
                            icon: 'https://cdn.superwen.cn/halo/cf23526f451784ff137f161b8fe18d5a.png',
                        },
                        {
                            name: 'uni-app',
                            url: 'https://uniapp.dcloud.io/',
                            icon: 'https://cdn.superwen.cn/wiki/uni-app.jpg',
                        },
                        {
                            name: 'Element UI',
                            url: 'https://element.eleme.cn/2.15/#/zh-CN/component/installation',
                            icon: base64s.element,
                        },
                        {
                            name: 'Muse-UI',
                            url: 'https://muse-ui.org/#/zh-CN/installation',
                            icon: 'https://cdn.superwen.cn/halo/a76a122f14523bd8345bd658d172004c.png',
                        },
                        {
                            name: 'Vue CLI',
                            url: 'https://cli.vuejs.org/zh/guide/',
                            emoji: '🛠️',
                        },
                    ],
                },
                {
                    title: 'Vue 3',
                    navs: [
                        {
                            name: 'Vue 3',
                            url: 'https://v3.cn.vuejs.org/guide/introduction.html',
                            icon: 'https://cdn.superwen.cn/halo/cf23526f451784ff137f161b8fe18d5a.png',
                        },
                        {
                            name: 'Vuex next',
                            url: 'https://next.vuex.vuejs.org/guide/',
                            icon: 'https://cdn.superwen.cn/halo/d656dee3067a5664f6ad3efcb31f509b.png',
                        },
                        {
                            name: 'Vuex Router next',
                            url: 'https://next.router.vuejs.org/zh/guide/',
                            icon: 'https://cdn.superwen.cn/halo/cf23526f451784ff137f161b8fe18d5a.png',
                        },
                        {
                            name: 'Element next',
                            url: 'https://element-plus.org/#/zh-CN/component/installation',
                            icon: base64s.element,
                        },
                        {
                            name: 'Vite',
                            url: 'https://cn.vitejs.dev/',
                            icon: 'https://cdn.superwen.cn/wiki/vite.svg',
                        },
                    ],
                },
                {
                    title: '其它',
                    navs: [
                        {
                            name: '又拍云文件管理',
                            url: 'https://console.upyun.com/services/superwen-blog/filemanage/',
                            icon: 'https://cdn.superwen.cn/halo/3d19c9fa280df94f157c43c7a18f9de9.jpg',
                        },
                        {
                            name: 'Stylus',
                            url: 'https://stylus.bootcss.com/',
                            icon: 'https://cdn.superwen.cn/halo/68c78ec3a7e25615d65041aec08fe9c6.png',
                        },
                    ],
                },
            ],
        }
    },
}
</script>

<style scoped lang="stylus">
.Navigation {
    background #fff
    .group {
        margin 0 auto
        padding 10px 20px
        max-width 1024px
        .title {
            margin 0
        }
        .navs {
            display flex
            flex-wrap wrap
            .nav {
                background #fff
                flex none
                color #444
                border-radius 3px
                box-shadow 0px 0px 4px rgba(8, 8, 8, 0.1)
                padding 8px 10px
                margin-right 10px
                margin-top 10px
                transition 0.35s
                &:hover {
                    transform translateY(-2px)
                    box-shadow 0px 0px 4px rgba(8, 8, 8, 0.2)
                }
                .emoji {
                    font-style normal
                    font-size 12px
                }
                .info {
                    display flex
                    align-items center
                    .icon {
                        width 20px
                        height 20px
                        align-self flex-start
                    }
                    .tit {
                        font-size 14px
                        margin-left 10px
                    }
                }
                .desc {
                    padding 0 0 3px
                    font-size 12px
                    color #888
                    margin-top 6px
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                }
            }
        }
    }
}
</style>
