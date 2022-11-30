<template lang="pug">
.Navigation
    .top-links
        a.link(v-for='i in topLinks', :href='i.url')
            i.emoji(v-if='i.emoji') {{ i.emoji }}
            img.icon(v-else, :src='i.icon')
            .name {{ i.name }}
    .category
        .group(v-for='item in groups', :key='item.title')
            .head(v-if='item.title') {{ item.title }}
            .navs
                a.nav(v-for='i in item.navs', :key='i.url', :href='i.url')
                    .info
                        i.emoji(v-if='i.emoji') {{ i.emoji }}
                        img.icon(v-else, :src='i.icon')
                        .tit {{ i.name }}
    iframe.dida(src='https://dida365.com/webapp')
</template>

<script>
import config from './nav.config.js'

export default {
    name: 'Navigation',
    data() {
        return {
            topLinks: config.topLinks,
            groups: config.groups,
        }
    },
}
</script>

<style scoped lang="stylus">
a {
    color #444
    font-weight normal
    font-size 14px
    &:hover {
        text-decoration underline
    }
}
.Navigation {
    font-size 14px
    .top-links {
        display flex
        flex-wrap wrap
        line-height 2
        padding 6px 0
        padding-right 10px
        max-width 804px
        border 1px solid #dee3eb
        .link {
            margin-left 15px
            display flex
            align-items center
            .icon {
                width 16px
            }
            .name {
                margin-left 4px
            }
        }
    }
    .category {
        background #fff
        margin-top 20px
        padding 10px 20px
        border 1px solid #dee3eb
        .group {
            padding 6px 0
            max-width 1024px
            display flex
            .head {
                margin 0
                font-weight 500
                color #0AA770
                width 46px
            }
            .navs {
                display flex
                flex-wrap wrap
                .nav {
                    margin-left 10px
                    .emoji {
                        font-style normal
                        font-size 12px
                    }
                    .info {
                        display flex
                        align-items center
                        .icon {
                            width 14px
                        }
                        .tit {
                            font-size 14px
                            margin-left 4px
                        }
                    }
                }
            }
        }
    }
    .dida {
        margin-top 20px
        width 100%
        height 560px
        border 1px solid #dee3eb
    }
}
</style>
