<template lang="pug">
.Home
    Search
    .box
        iframe.dida(src='https://dida365.com/webapp')
        Navigation.box-nav
</template>

<script>
import Search from './widget/Search'
import Navigation from './widget/Navigation'
export default {
    name: 'Home',
    components: { Search, Navigation },
}
</script>

<style scoped lang="stylus">
.Home {
    padding-top 5rem
    background #f3f3f3
    min-height 100vh
    .box {
        display flex
        margin-top 50px
        justify-content center
    }
    .dida {
        margin 0 10px
        width 380px
        height 660px
        border 0
        box-shadow 1px 1px 4px rgba(8, 8, 8, 0.1)
        border-radius 10px
    }
    .box-nav {
        margin 0 10px
        min-width 480px
    }
}
</style>
