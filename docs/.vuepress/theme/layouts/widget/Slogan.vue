<template lang="pug">
.site-name(
    :class='{ "can-hide": $site.themeConfig.logo, ok: word }',
    @mouseenter='mouseIn = "mouse-in"',
    @mouseleave='mouseIn = "mouse-out"'
)
    .word {{ word }}
    .full(
        v-if='poetry',
        :class='mouseIn',
        ref='full',
        :style='{ "--location": -(poetry.location + 1) * 1.5 + "rem" }'
    )
        .title {{ poetry.title }}
        .author {{ poetry.dynasty }}{{ " · " }}
            i {{ poetry.author }}
        .content(ref='content')
            .sentence(v-for='s in poetry.content') {{ s }}
</template>

<script>
export default {
    name: 'Slogan',
    data: () => ({ word: '', poetry: null, mouseIn: null }),
    mounted() {
        this.loadPoetry()
    },
    methods: {
        loadPoetry() {
            const script = document.createElement('script')
            script.src = 'https://sdk.jinrishici.com/v2/browser/jinrishici.js'
            document.head.appendChild(script)
            script.onload = () => {
                jinrishici.load(result => {
                    this.word = result.data.content
                    this.$nextTick(() => {
                        this.translate(result.data)
                        this.$emit('resize')
                    })
                })
            }
        },
        translate(data) {
            console.log(JSON.stringify(data, null, 2))
            const d1 = data.origin.content
                .join('')
                .replace(/(。|！|？)(.)/g, '$1FLAG$2')
                .split('FLAG')
            console.log(JSON.stringify(d1, null, 2))
            let location = d1.indexOf(data.content)
            console.log('第几句：', ++location)
            this.poetry = {
                ...data.origin,
                content: d1,
                location,
            }
            this.$nextTick(() => this.checkMaxWidth())
        },
        checkMaxWidth() {
            const data = Array.from(this.poetry.content)
            data.push(this.poetry.title)
            const showLength = this.word.length
            const maxLength = data.reduce(
                (acc, cur) => (cur.length > acc ? cur.length : acc),
                showLength
            )
            // 宽度超出屏幕
            if (maxLength > showLength) {
                // 字宽
                const w = Math.ceil(this.$el.offsetWidth / showLength)
                const bodyWidth = document.body.clientWidth || document.body.offsetWidth
                this.$refs.content.style.width = w * maxLength + 'px'
                console.log('字段', maxLength, showLength, w, bodyWidth, w * maxLength)
                if (bodyWidth - 100 < w * maxLength) {
                    this.$refs.full.style.maxWidth = bodyWidth - 100 + 'px'
                    this.$refs.full.style.overflowX = 'auto'
                }
            }
            // 高度超出屏幕
            const bodyHeight = document.body.clientHeight || document.body.offsetHeight
            const elHeight = this.$refs.full.offsetHeight
            if (bodyHeight - 200 < elHeight) {
                this.$refs.full.style.maxHeight = bodyHeight - 200 + 'px'
                this.$refs.full.style.overflowY = 'auto'
            }
        },
    },
}
</script>

<style lang="stylus">
.site-name {
    font-size 1.1rem
    font-weight 600
    color $textColor
    position relative
    font-family Xingkai SC, STKaiti
    display inline-block
    position relative
    &::after {
        content ''
        position absolute
        left 0
        top 0
        bottom 0
        right 0
        background #fff
        transition 2s cubic-bezier(0.29, 1, 0.29, 1)
        transform scale(1)
        transform-origin right center
    }
    &.ok::after {
        transform scale(0, 1)
    }
    .word {
        line-height 1.5rem
        position relative
        transition 0.45s
        // 增加范围
        &::after {
            content ''
            position absolute
            left 0
            right 0
            top -20px
            bottom -10px
        }
    }
    .full {
        position absolute
        left 0
        top var(--location)
        line-height 1.5rem
        visibility hidden
        opacity 0
        transition 0.8s
        background #fff
        z-index 2
        .author {
            font-size 12px
            i {
                font-style normal
            }
        }
        &::after {
            content ''
            position absolute
            left -10px
            right -10px
            bottom -10px
            top -10px
            background #fff
            z-index -1
        }
        &.mouse-in {
            animation show 0.45s both
        }
        &.mouse-in::after {
            animation after-show 0.45s both
        }
        &.mouse-out {
            animation hide 0.8s both reverse ease-in-out
        }
        &.mouse-out::after {
            animation after-hide 0.8s both reverse ease-in-out
        }
        @keyframes show {
            to {
                top 0
                visibility visible
                opacity 1
            }
        }
        @keyframes hide {
            50% {
                opacity 1
                top var(--location)
            }
            to {
                top 0
                visibility visible
                opacity 1
            }
        }
        @keyframes after-hide {
            50% {
                box-shadow 0 0 0 rgba(0, 0, 0, 0)
            }
            to {
                box-shadow 0 0 4px rgba(0, 0, 0, 0.1)
            }
        }
        @keyframes after-show {
            to {
                box-shadow 0 0 4px rgba(0, 0, 0, 0.1)
            }
        }
    }
    &:hover {
        .word {
            opacity 0
        }
    }
}
@media (max-width $MQMobile) {
    .navbar {
        .word {
            line-height 2.2rem
        }
    }
}
</style>
