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
            { text: '前端技术', link: '/web/' },
            { text: '解决方案', link: '/solution/' },
            // { text: '代码片段', link: '/snippets/js/util' },
            { text: '工程化', link: '/project/' },
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
                    { text: '十大经典算法', link: '/subject/algorithm/' },
                    {
                        text: 'TypeScript 类型体操通关秘籍',
                        link: '/subject/jj/typescript/',
                    },
                    // { text: '前端算法与数据结构面试', link: '/subject/jj/algorithm/' },
                    { text: '设计模式', link: '/subject/jj/design-pattern/' },
                    {
                        text: 'JavaScript设计模式',
                        link: 'https://books.superwen.cn/JavaScript%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F.pdf',
                    },
                ],
            },
            { text: '我的博客', link: 'https://superwen.cn' },
        ],
        sidebar: {
            '/project/': [],
            '/web/': [
                'qiankun',
                'comments',
                {
                    title: '代码片段', // 必要的
                    path: 'snippets/js/util', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    // collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [
                        'snippets/js/util',
                        'snippets/js/dom-util',
                        'snippets/js/object',
                        'snippets/js/canvas',
                    ],
                },
                {
                    title: '前端算法与数据结构面试',
                    path: '/subject/jj/algorithm/',
                },
            ],
            '/solution/': ['mobile', 'questions/m1-node', 'node-choose', 'sentry'],
            '/DevOps/': [
                'ssh',
                'npm-scripts-deploy',
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
                '/subject/algorithm/1.bubbleSort',
                '/subject/algorithm/2.selectionSort',
                '/subject/algorithm/3.insertionSort',
                '/subject/algorithm/4.shellSort',
                '/subject/algorithm/5.mergeSort',
                '/subject/algorithm/6.quickSort',
                '/subject/algorithm/7.heapSort',
                '/subject/algorithm/8.countingSort',
                '/subject/algorithm/9.bucketSort',
                '/subject/algorithm/10.radixSort',
            ],
            '/subject/jj/algorithm/': [
                '/subject/jj/algorithm/',
                '/subject/jj/algorithm/1',
                '/subject/jj/algorithm/2',
                '/subject/jj/algorithm/3',
                '/subject/jj/algorithm/4',
                '/subject/jj/algorithm/5',
                '/subject/jj/algorithm/6',
                '/subject/jj/algorithm/7',
                '/subject/jj/algorithm/8',
                '/subject/jj/algorithm/9',
                '/subject/jj/algorithm/10',
                '/subject/jj/algorithm/11',
                '/subject/jj/algorithm/12',
                '/subject/jj/algorithm/13',
                '/subject/jj/algorithm/14',
                '/subject/jj/algorithm/15',
                '/subject/jj/algorithm/16',
                '/subject/jj/algorithm/17',
                '/subject/jj/algorithm/18',
                '/subject/jj/algorithm/19',
                '/subject/jj/algorithm/20',
                '/subject/jj/algorithm/21',
                '/subject/jj/algorithm/22',
                '/subject/jj/algorithm/23',
                '/subject/jj/algorithm/24',
                '/subject/jj/algorithm/25',
                '/subject/jj/algorithm/26',
                '/subject/jj/algorithm/27',
                '/subject/jj/algorithm/28',
            ],
            '/subject/jj/design-pattern/': 'auto',
        },
    },
}
