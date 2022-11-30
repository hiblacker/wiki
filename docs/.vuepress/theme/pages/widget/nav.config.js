const base64s = {
    wechat: "data:image/svg+xml;charset=UTF-8,%3csvg width='36' height='36' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M27.4362985 16.6454925c-.7072239 1.1607165-1.8835821 2.0505075-3.2927761 2.4601791-.0354627.0102687-.0705672.0212538-.1062687.0309254-.2176716.0618508-.4409552.0997015-.6622089.0997015-.9763582 0-1.5276418-.6594627-1.2315224-1.4730746.216597-.5949851.785194-1.097194 1.4791642-1.3296717 1.0755821-.3922388 1.8271044-1.2868059 1.8271044-2.3277612 0-1.4026268-1.3645373-2.5397014-3.0476417-2.5397014-1.6832239 0-3.0476418 1.1370746-3.0476418 2.5397014v7.788418c0 1.8730746-1.0852538 3.515582-2.709015 4.4445373-.8851343.506388-1.9277612.8040597-3.0475224.8040597-3.1743283 0-5.75665667-2.3545075-5.75665667-5.248597 0-.9211941.26340299-1.7863881.72238806-2.5397015.71032836-1.1658508 1.89397011-2.0586269 3.31164181-2.4656717.001194-.0003582.0022686-.0007164.0034627-.0010746.2390447-.0743881.4869253-.1157015.7313433-.1157015.9806567 0 1.5345671.6625672 1.2371343 1.4797612-.2015523.553791-.7443582 1.0306866-1.377194 1.2844179-.0755821.025194-.1491344.0534925-.2217314.0833433-1.0052537.4150448-1.6980298 1.2762985-1.6980298 2.2746269 0 1.4026268 1.3644179 2.539582 3.0476417 2.539582 1.6831045 0 3.0475224-1.1369552 3.0475224-2.539582v-7.788418c0-1.873194 1.0851344-3.515582 2.709015-4.44465667.8851343-.50638806 1.9277612-.8040597 3.0476418-.8040597 3.1742089 0 5.7566567 2.35450747 5.7566567 5.24871637 0 .9210747-.2635224 1.7863881-.7225075 2.5397015M18 2C9.16346269 2 2 9.16346269 2 18c0 8.8365373 7.16346269 16 16 16 8.8365373 0 16-7.1634627 16-16 0-8.83653731-7.1634627-16-16-16' fill='%2307C160' fill-rule='evenodd'/%3e%3c/svg%3e",
}
export default {
    topLinks: [
        {
            name: '掘金',
            url: 'https://juejin.cn',
            icon: 'https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/gold.981a5510.svg',
        },
        {
            name: '知乎',
            url: 'https://zhihu.com',
            icon: 'https://cdn.superwen.cn/halo/20dd524ea25e05eb0608f7bae03f501f.png',
        },
        {
            name: 'V2EX',
            url: 'https://www.v2ex.com/',
            icon: 'https://www.v2ex.com/static/favicon.ico',
        },
        {
            name: 'LeetCode',
            url: 'https://leetcode.cn/problemset/all/',
            icon: 'https://leetcode.cn/favicon.ico',
        },
        {
            name: 'StackOverflow',
            url: 'https://stackoverflow.com/questions/tagged/javascript?tab=Active',
            icon: 'https://cdn.superwen.cn/halo/fd9d6a58f832e262aff6c14d1f798e84.png',
        },
        {
            name: 'Hacker News',
            url: 'https://news.ycombinator.com/',
            icon: 'https://news.ycombinator.com/favicon.ico',
        },
        {
            name: 'Reddit',
            url: 'https://www.reddit.com/r/popular/',
            icon: 'https://cdn.superwen.cn/halo/31513f7ebbf04d5540fd8c2484f7dd27.png',
        },
        {
            name: 'segmentfault',
            url: 'https://segmentfault.com/questions/hottest/monthly',
            icon: 'https://static.segmentfault.com/main_site/afc45ad8/favicon.ico',
        },
        {
            name: 'CNode',
            url: 'https://cnodejs.org/',
            icon: 'https://static2.cnodejs.org/public/images/cnode_icon_32.png',
        },
        {
            name: '开源中国',
            url: 'https://www.oschina.net/',
            icon: 'https://static.oschina.net/new-osc/img/favicon.ico',
        },
        {
            name: 'Github',
            url: 'https://github.com/explore',
            icon: 'https://cdn.superwen.cn/wiki/favicon.svg',
        },
    ],
    groups: [
        {
            title: '文档',
            navs: [
                {
                    name: '小程序',
                    url: 'https://developers.weixin.qq.com/miniprogram/dev/framework/',
                    icon: base64s.wechat,
                },

                {
                    name: '企业微信SDK',
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
                    url: 'https://v2.cn.vuejs.org/v2/guide/',
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
                    icon: 'https://cdn.superwen.cn/halo/ddadd968ad0152848c14994d14d207e9.png',
                },
                {
                    name: 'Muse-UI',
                    url: 'https://muse-ui.org/#/zh-CN/installation',
                    icon: 'https://cdn.superwen.cn/halo/a76a122f14523bd8345bd658d172004c.png',
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
                    icon: 'https://cdn.superwen.cn/wiki/element-plus-logo-small.svg',
                },
            ],
        },
        {
            title: '工程化',
            navs: [
                {
                    name: 'Webpack',
                    url: 'https://webpack.docschina.org/concepts/',
                    icon: 'https://webpack.js.org/icon-square-small.85ba630cf0c5f29ae3e3.svg',
                },
                {
                    name: 'Vue CLI',
                    url: 'https://cli.vuejs.org/zh/guide/',
                    emoji: '🛠️',
                },
                {
                    name: 'Vite',
                    url: 'https://cn.vitejs.dev/',
                    icon: 'https://cdn.superwen.cn/wiki/vite.svg',
                },
            ],
        },
        {
            title: '工具',
            navs: [
                {
                    name: '又拍云文件管理',
                    url: 'https://console.upyun.com/services/superwen-blog/filemanage/',
                    icon: 'https://cdn.superwen.cn/halo/3d19c9fa280df94f157c43c7a18f9de9.jpg',
                },
                {
                    name: 'Apifox',
                    url: 'https://www.apifox.cn/apihub',
                    icon: 'https://cdn.apifox.cn/logo/apifox-logo-512.png',
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
