<template lang="pug">
.Home
    Search
    //- iframe.dida(src='https://dida365.com/webapp')
    Navigation
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
    .dida {
        width 380px
        height 660px
        border 0
        box-shadow 2px 3px 15px rgba(8, 8, 8, 0.5)
        border-radius 10px
    }
}
</style>
