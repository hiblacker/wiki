<template lang="pug">
.Feed
    .navs
        a.item(v-for='(x, k) in navs', :class='{ on: k == active }', :href='x.href') {{ x.name }}
    .loading(v-if='listLoading') 加载中...
    .list(v-else-if='list.length > 0')
        .item(v-for='(i, k) in list')
            a(
                :href='`https://juejin.cn/post/${i.item_info.article_id}`',
                target='_blank'
            )
                .num {{ k + 1 }}.
                | {{ i.item_info.article_info.title }}
            .info
                .cat {{ i.item_info.author_user_info.user_name }}
                .cat.rightLine {{ getRelativeTime(i.item_info.article_info.rtime) }}
                //- 查看数
                .cat
                    img(
                        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAr9JREFUWEftVjtoFUEUPXfXvM5OCz+FQlQQ0cJSCTZ+QE1UiKjY2gh+Gj8vz7k7M6uuiYUQsbOLRJJGMWAR7UQUxCb6BEnEShsDgk3gxTdX5rkvrPF9lAQXIReW3eX+zpx7584QchbKOT+WAPyfDCRJ0lmpVDYEQdDpe8g5N1UoFCaLxeLU3/bUHzGgtV4RBEE3gB4A/t1UiGjIOTdWKBSeFovFr+0AtQVgrT0B4CqA9dlgIjIB4BURVQFsT5+syUcAV5h5uCXgVso4jgdF5Exq8x7AXeecT/xSa/0t69vf37+8UqnUgIjIKQCbvJ6IbiulzjbL05SBOI5HRaQ3dRxwzt3UWk/7/ziO96Qr3iYiswBei0g5iqInXp+W7AKAi6n/M2buagSiIQBrradvHYBHAAaY+Xnd2VrbB+Baw2BE95VSvmQ1sdbuSEH4vplm5pXz/X4DYK39DGAVgHHn3H6t9fdMQPHfIvLON5uIfAiCYFZENgLwNK/xemaei6u1XhYEwRiAfQDeMPPWLIhfAFhrveEBAC9mZmZ6kiT5UjeO43hYRI6LiImiSDdiwBijiSgCUGLm63WbtCQPAXhGisx8o66bA1B3JqK3AI4opSbrRsaY3UQ0DuATM69t1bjGmDIRbSaivUop71MTrXVnGIYPRGSLiHRHUeQX+/MsMMYcJKJRIpJqtXpIaz3nmNbyPIBbAC4x80ArANbaywASIupTSiVZW631riAIHgOohGHYVSqVJkhrvToMwxER2QngHDMPzk9grR0CcJKIDiulPJVNxRjTmy5mRCl1rEGs0wDueEY7OjqO5g8g9xJkGq3Wwbk0YWaft92GRKSVUmbRt2EGRNtBBKAM4N6iD6IMiPxGcWby5XcYZUDkdxxnypHfhWTeYZLPlazRdvvnl9JWs3+huraX0oUmaOe/BCB3Bn4AIAPZfjwbk2IAAAAASUVORK5CYII='
                    )
                    i {{ i.item_info.article_info.view_count }}
                //- 点赞数
                .cat
                    img(
                        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJ9SURBVHgB7VZNbtNQEP7GP7AkN8DcoJyA5gRNTwCR2kqsUm9YEKEaoZRl0hUSBLWcAHOCpjdIT1AfIewgTjzM+AccxwHXLRYS/STnvbyxZ743b34e8L+DcEMMhu+fERk7DLTAuAwRjjz3eVD1+xsROD75eARmr7AczDlsVyVhoCbeDt85mXHmqLtkbst0Ko9jk31aVU9tAgvYW7FxYNJ3D85eufuTOZtKYiZu3X4z/LBdRU9tAia4E0+YL7I1z+3OmPEpkWOrip7aBED0RAcb7K8KeBb/alD+LQIa+TI48kxfuAfTVSlVMlybgAafpN1RYgujopwIOzpGEhuogGuloTc8bd2j5TmS8/VfHu7t5uUaeCaRygORPaqi00JFJAVn2UuNa667xXfEeJZ+rePR+Kool7gIQg67+RpBJTvo5QMoZHPXxFLW8Tld2lhoUqMOfg/JlKjdT2Pnpwf0bDlx3worG1EnPlENF0m5OayO5+7NyjRLHXgMfCsNQhumrBviRfRAhnqyu0KAYXmpcX/BfKKekL+dvBIheOUddkuNK7QO6A43ycXDvolYr5OtGTnlD3VU41rVZLdfccvIipMYDdYINAHZZJyicgR+4wQ0hbVH6Px7RBeNE9BM0lGbVxorTRNImhcxf8mvNxcDafOywBM0TUCqqEa/I09QbF6NECDQdjKuN6hGCJSlX2MENqXfGgFKS6hlmA9wi7hvLJ/qWEy/DL96AfMlEXWkU/mD0XiCkjud7kRk56iOltwRYz3ShM7KXlhpx4PheBR3qxzS6zbSi0YtyOZe9919D38ioNC2vIDl6NyQC2bWtzWVomvf93gWwg7KXH+HfwY/AGsn+Lf3Dim6AAAAAElFTkSuQmCC'
                    )
                    i {{ i.item_info.article_info.digg_count }}
                //- 评论数
                .cat
                    img(
                        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKRSURBVHgB7VZNbtpQEJ55BlR15RvUOUHTG5ATJD1BQ9NU6gq8JKiKoyrJ0u2qUmkFOUGaE5TegJwg7gnqLRh7MvMwwiDbYHCUDZ9kHph5M9+bN38AO+zwzEAoiEv3xz4v/KAFiK/0S6J/qPCBoui+Y38cFlC3HgHH7Zk1FTXZUIt/mivEPVY6GFFw4difPNiWwNW3X+dLhj1iA3JqProXq7EQ8TVoz4A1147OWfPkAjYhcO1+twirt7FSEexPiG4+26cDyMEXt1s3AI7Z+LsZ4TEFB1newBzjf2B6Gi8kaqwyvEpHFgmVtjmxcTgm401R44I2G0M2KjpEV5W9KbG0koC+8znrt47d8GFDCAk+gJCQwNyvwqS1LLNwBbHbHuQ7G99bJ4rXgY4LRPGqz4T2koda8EAERl2zIrory7hArlBnDmdSDSbHyf8WrwDVNHKV0YOyQdGNXhAPMwlgnHKjaHQPJUNBOEjamL9fhI7SMt0/Q3uu08wjoJGWLk+FZQKefLyEwIKSETcxwTCbANFfWQLAIygZCFifrjkEQq73WgixCaUziHWi+p1JIC65Hj/mpdt1oCQkq2u7+f4uk4BAGo8minguFQy2hFRXvlonqTuXgK5aRLqHc/m8vXK7LdgCE6hYskolTGtqqWnYsU+dmITJrnCvv/7sOXKSDVCBiScrJgeVBHInIokDuYqEsB5KQqgMl7uk1A4DwrpCkFLLExL0x1HAWfXCr2H4X2TOWh+wEAGB7pBQcRITzgwymvmxEilcVtp+cX1cfs20Drv2VKyDSVUPI4Ij3lRPEfFJclzXEvIQlXhioZ4QYaNjn/Q3IrAMiQmDA0wB+QGEflr/ENK6xXOXFS8QRQdFx/YdnhyP1D0hcwr1KvEAAAAASUVORK5CYII='
                    )
                    i {{ i.item_info.article_info.comment_count }}
    .no-data(v-else) 暂无数据
</template>

<script>
import axios from 'axios'
import * as utils from '@theme/utils/utils'
export default {
    name: 'Feed',
    data() {
        return {
            active: 0,
            navs: [{ name: '掘金', href: 'https://juejin.cn/' }],
            list: [],
            listLoading: false,
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getRelativeTime(v) {
            return utils.getRelativeTime(v * 1000)
        },
        getList() {
            const body = {
                client_type: 6587,
                cursor: '0',
                id_type: 2,
                limit: 50,
                // 300-最新 200-推荐 3-热榜
                sort_type: 200,
            }
            this.listLoading = true
            axios
                .post('//api.superwen.cn/home/juejin-recommend', body)
                .then(res => {
                    this.list = res.data.data
                })
                .finally(() => {
                    this.listLoading = false
                })
        },
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
i {
    font-style normal
}
.Feed {
    border 1px solid #dee3eb
    .navs {
        background #FAFBFC
        display flex
        padding 0 20px
        .item {
            line-height 2.5
            &.on {
                border-top 2px solid #0AA770
                color #0AA770
                font-weight 500
            }
        }
    }
    .loading, .no-data {
        padding 10px 0 0 20px
        font-size 12px
        color #828282
    }
    .list {
        padding 10px
        min-height 100px
        .item {
            padding-bottom 8px
            a {
                display inline-flex
                .num {
                    flex none
                    color #828282
                    width 20px
                    margin-right 6px
                    text-align right
                }
            }
            .info {
                display flex
                font-size 12px
                color #828282
                padding-left 26px
                padding-top 4px
                align-items center
                .cat {
                    display flex
                    align-items center
                    padding-right 6px
                    img {
                        width 14px
                        margin-right 4px
                    }
                }
                .rightLine {
                    padding-right 10px
                    margin-right 10px
                    border-right 1px solid #e5e6eb
                    height 12px
                }
            }
        }
    }
}
</style>
