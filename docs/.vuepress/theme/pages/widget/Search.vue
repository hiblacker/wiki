<template lang="pug">
.Search
    .input-box
        input(ref='input', v-model='query', @keyup.enter='search', @keyup.down='change')
        .btn-box
            .btn(@click='search') {{ which }}
    .preview(v-if='query && which != "Google"')
        iframe(:src='searchUrl')
</template>

<script>
export default {
    name: 'Search',
    data() {
        return {
            which: 'Google',
            query: '',
        }
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
        this.$nextTick(() => {
            this.$refs.input?.focus()
        })
    },
    methods: {
        search() {
            if (!this.query) return
            location.href = this.searchUrl
        },
        change() {
            this.which = this.which === 'Google' ? '百度' : 'Google'
        },
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
