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
                    .desc(v-if='i.desc') {{ i.desc }}
    Feed
</template>

<script>
import config from './nav.config.js'
import Feed from './Feed'

export default {
    name: 'Navigation',
    components: { Feed },
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
        padding 5px 20px
        border 1px solid #dee3eb
        .group {
            margin 0 auto
            padding 10px 0
            max-width 1024px
            display flex
            // & + .group {
            //     border-top 1px solid #dee3eb
            // }
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
}
</style>
