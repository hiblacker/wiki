module.exports = {
    title: '日常记录',
    description: '向内而求，向死而生',
    lastUpdated: true,
    head: [
        ['link', { rel: 'icon', href: '/ico.ico' }],
        [
            'link',
            {
                rel: 'stylesheet',
                href: 'https://cdn.bootcdn.net/ajax/libs/viewerjs/1.10.5/viewer.min.css',
            },
        ],
        [
            'script',
            {
                src: 'https://cdn.bootcdn.net/ajax/libs/viewerjs/1.10.5/viewer.min.js',
            },
        ],
        [
            'script',
            {
                src: 'https://hm.baidu.com/hm.js?cba5944fbdb3bcd8aad9bf96877696c7',
                async: true,
            },
        ],
    ],
    port: 6688,
    markdown: {
        lineNumbers: true,
        extendMarkdown: md => {
            // 复制代码块
            md.use(require('markdown-it-copy'), {
                btnText: '复制代码', // 'copy' | button text
                failText: 'fail', // 'copy fail' | copy-fail text
                successText: 'ok', // 'copy success' | copy-success text
            })
        },
    },
    themeConfig: {
        lastUpdated: '最后更新',
        nav: [
            // { text: '知识体系', link: '/outline/' },
            { text: '前端', link: '/web/' },
            { text: '解决方案', link: '/solution/' },
            // { text: '代码片段', link: '/snippets/js/util' },
            { text: '运维', link: '/DevOps/' },
            {
                text: '工具',
                ariaLabel: 'Language Menu',
                items: [
                    { text: '博客搭建', link: '/tools/blog/' },
                    { text: '工作流', link: '/tools/workflow/' },
                    { text: 'Git', link: '/tools/git/' },
                    { text: 'NVM', link: '/tools/nvm' },
                ],
            },
            {
                text: '专题',
                ariaLabel: 'Language Menu',
                items: [
                    { text: 'Webpack', link: 'https://books.superwen.cn/webpack/' },
                    { text: '算法', link: '/subject/algorithm/' },
                    {
                        text: 'JavaScript设计模式',
                        link: 'https://books.superwen.cn/JavaScript%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F.pdf',
                    },
                ],
            },
            { text: '我的博客', link: 'https://superwen.cn' },
        ],
        sidebar: {
            '/web/': [
                {
                    title: '知识体系',
                    path: '/web/',
                },
                'qiankun',
                'comments',
                {
                    title: '代码片段', // 必要的
                    path: '/web/snippets/js/util', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    // collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [
                        'snippets/js/util',
                        'snippets/js/dom-util',
                        'snippets/js/object',
                        'snippets/js/canvas',
                    ],
                },
            ],
            '/solution/': ['mobile', 'questions/m1-node', 'node-choose', 'sentry'],
            '/DevOps/': [
                'ssh',
                'npm-scripts-deploy',
                'https-deploy',
                'linux',
                {
                    title: 'DevOps', // 必要的
                    path: '/DevOps/docker/why-docker', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: ['docker/why-docker', 'docker/docker-deploy'],
                },
            ],
            '/tools/blog/': ['/tools/blog/VuePress', '/tools/blog/img-preview'],
            '/tools/workflow/': ['/tools/workflow/image-uploader'],
            '/tools/git/': ['/tools/git/git'],
            '/subject/algorithm/': [
                '/subject/algorithm/',
                '/subject/algorithm/complexity',
                {
                    title: '十大经典排序算法',
                    path: '/subject/algorithm/basic/',
                    children: [
                        '/subject/algorithm/basic/1.bubbleSort',
                        '/subject/algorithm/basic/2.selectionSort',
                        '/subject/algorithm/basic/3.insertionSort',
                        '/subject/algorithm/basic/4.shellSort',
                        '/subject/algorithm/basic/5.mergeSort',
                        '/subject/algorithm/basic/6.quickSort',
                        '/subject/algorithm/basic/7.heapSort',
                        '/subject/algorithm/basic/8.countingSort',
                        '/subject/algorithm/basic/9.bucketSort',
                        '/subject/algorithm/basic/10.radixSort',
                    ],
                },
                '/subject/algorithm/binary-tree',
            ],
        },
    },
}
