<template lang="pug">
.Search(@keyup.meta='keyup')
    .input-box
        form(:action='searchUrl', method='get', target='_blank', @submit='submit')
            input(
                ref='input',
                v-model='query',
                @keyup.down='change',
                @focus='onfocus',
                @blur='onblur'
            )
        .btn-box
            .btn(@click='search') {{ which }}
        transition(name='fade')
            .suggestion(v-if='suggestions.length')
                .item(v-for='i in suggestions', :key='i', @click='(query = i), search()') {{ i }}
    //- .preview(v-if='query && which != "Google"')
    //-     iframe(:src='searchUrl')
</template>

<script>
export default {
    name: 'Search',
    data() {
        return {
            which: 'Google',
            query: '',
            suggestions: [],
            focus: false,
        }
    },
    watch: {
        query(val) {
            if (!val) {
                this.suggestions = []
                return
            }
            const url = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}&cb=getSuggestion`
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = url
            document.getElementsByTagName('head')[0].appendChild(script)
            setTimeout(() => {
                document.getElementsByTagName('head')[0].removeChild(script)
            }, 0)
        },
    },
    computed: {
        searchUrl() {
            let url
            if (this.which == 'Google') {
                url = `https://google.com/search?q=${this.query}`
            } else {
                url = `https://baidu.com/s?word=${this.query}`
            }
            return url
        },
    },
    mounted() {
        window.getSuggestion = this.getSuggestion
        this.$nextTick(() => {
            this.$refs.input?.focus()
        })
        document.onkeydown = this.listen
    },
    methods: {
        onfocus() {
            this.focus = true
        },
        onblur() {
            this.focus = false
        },
        listen(e) {
            var keyNum = window.event ? e.keyCode : e.which
            // 按下 ~ 建
            if (keyNum == 192) {
                this.$refs.input?.focus()
                setTimeout(() => {
                    this.query = ''
                }, 0)
            }
        },
        submit() {
            this.search()
        },
        getSuggestion(res) {
            console.log(res.s)
            this.suggestions = res.s
        },
        search() {
            if (!this.query) return
            window.open(this.searchUrl)
            this.suggestions = []
        },
        change() {
            this.which = this.which === 'Google' ? '百度' : 'Google'
        },
    },
    beforeDestroy() {
        document.onkeydown = null
    },
}
</script>

<style scoped lang="stylus">
.Search {
    padding-top 2rem
    text-align center
    .input-box {
        display flex
        align-items center
        justify-content center
        position relative
        input {
            border 1
            outline none
            width 512px
            height 40px
            padding 12px 16px
            vertical-align top
            outline 0
            box-shadow none
            border-radius 10px 0 0 10px
            border 2px solid #c4c7ce
            background #fff
            color #222
            box-sizing border-box
        }
        .btn-box {
            display flex
            align-items center
            justify-content center
            background #4e6ef2
            color #fff
            height 40px
            width 120px
            margin-left -2px
            border-radius 0 10px 10px 0
            cursor pointer
            user-select none
        }
        .btn {
            font-weight bold
        }
        .suggestion {
            position absolute
            left 50%
            transform translate(-50%, 0)
            top 40px
            text-align left
            width 630px
            background #fff
            border-radius 10px
            padding 10px 20px
            box-shadow 1px 1px 5px rgba(8, 8, 8, 0.4)
            .item {
                margin 8px 0
                cursor pointer
                color #666
                &:hover {
                    color #333
                }
            }
        }
        .fade-enter-active, .fade-leave-active {
            transition 0.3s
        }
        .fade-enter, .fade-leave-to {
            opacity 0
            transform translate(-50%, 20px)
        }
    }
    .preview {
        display flex
        align-items center
        justify-content center
        iframe {
            margin 20px 10px
            width 750px
            height 800px
        }
    }
}
</style>
