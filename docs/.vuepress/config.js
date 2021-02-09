module.exports = {
    title: "Superwen's wiki",
    description: "Superwen's wiki",
    head: [["link", { rel: "icon", href: "/ico.ico" }]],
    port: 6688,
    markdown: {
        lineNumbers: true,
        extendMarkdown: (md) => {
            // 复制代码块
            md.use(require("markdown-it-copy"), {
                btnText: "复制代码", // 'copy' | button text
                failText: "fail", // 'copy fail' | copy-fail text
                successText: "ok", // 'copy success' | copy-success text
            });
        },
    },
    themeConfig: {
        nav: [
            { text: "代码片段", link: "/snippets/js/util" },
            { text: "运维", link: "/DevOps/ssh" },
            {
                text: "工具",
                ariaLabel: "Language Menu",
                items: [
                    { text: "博客搭建", link: "/tools/blog/" },
                    { text: "工作流", link: "/tools/workflow/" },
                ],
            },
            { text: "我的博客", link: "https://superwen.cn" },
        ],
        sidebar: {
            "/DevOps/": ["ssh", "npm-scripts-deploy", "docker-deploy"],
            "/snippets/": [
                {
                    title: "JavaScript", // 必要的
                    path: "/snippets/js/util", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    // collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [
                        {
                            title: "util",
                            path: "js/util",
                        },
                    ],
                },
            ],
            "/tools/blog/": ["/tools/blog/VuePress"],
            "/tools/workflow/": ["/tools/workflow/image-uploader"],
        },
    },
};
