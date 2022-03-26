module.exports = {
    title: 'Hello World',
    description: '向内而求，向死而生',
    head: [['link', { rel: 'icon', href: '/ico.ico' }]],
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
        nav: [
            { text: '知识体系', link: '/list/' },
            { text: '前端技术', link: '/web/' },
            { text: '解决方案', link: '/solution/' },
            { text: '代码片段', link: '/snippets/js/util' },
            { text: '工程化', link: '/project/' },
            { text: '运维', link: '/DevOps/' },
            {
                text: '工具',
                ariaLabel: 'Language Menu',
                items: [
                    { text: '博客搭建', link: '/tools/blog/' },
                    { text: '工作流', link: '/tools/workflow/' },
                    { text: 'Git', link: '/tools/git/' },
                ],
            },
            {
                text: '文档',
                ariaLabel: 'Language Menu',
                items: [
                    { text: 'Webpack', link: 'https://books.superwen.cn/webpack/' },
                    { text: '十大经典算法', link: '/algorithm/' },
                ],
            },
            { text: '我的博客', link: 'https://superwen.cn' },
        ],
        sidebar: {
            '/project/': ['nvm'],
            '/web/': ['qiankun', 'comments'],
            '/solution/': ['mobile', 'questions/m1-node'],
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
            '/snippets/': [
                {
                    title: 'JavaScript', // 必要的
                    path: '/snippets/js/util', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    // collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: ['js/util', 'js/dom-util', 'js/object', 'js/canvas'],
                },
            ],
            '/tools/blog/': ['/tools/blog/VuePress'],
            '/tools/workflow/': ['/tools/workflow/image-uploader'],
            '/tools/git/': ['/tools/git/git'],
            '/algorithm/': [
                '/algorithm/1.bubbleSort',
                '/algorithm/2.selectionSort',
                '/algorithm/3.insertionSort',
                '/algorithm/4.shellSort',
                '/algorithm/5.mergeSort',
                '/algorithm/6.quickSort',
                '/algorithm/7.heapSort',
                '/algorithm/8.countingSort',
                '/algorithm/9.bucketSort',
                '/algorithm/10.radixSort',
            ],
        },
    },
}
