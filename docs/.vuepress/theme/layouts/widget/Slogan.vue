<template lang="pug">
.site-name(:class='{ "can-hide": $site.themeConfig.logo, ok: word }')
    .word {{ word }}
    .full(v-if='poetry', :style='{ "--location": -(poetry.location + 1) * 1.5 + "rem" }')
        .title {{ poetry.title }}
        .author {{ poetry.dynasty }}{{' · '}}
            i {{ poetry.author }}
        .content
            .sentence(v-for='s in poetry.content') {{ s }}
</template>

<script>
export default {
    name: 'Slogan',
    data: () => ({ word: '', poetry: null }),
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
                    this.translate(result.data)
                    this.$nextTick(() => {
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
        opacity 1
        transition 0.45s cubic-bezier(0.29, 1, 0.29, 1)
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
            box-shadow 0 0 4px rgba(0, 0, 0, 0.1)
        }
    }
    &:hover {
        .word {
            opacity 0
        }
        .full {
            top 0
            visibility visible
            opacity 1
        }
    }
}
</style>
