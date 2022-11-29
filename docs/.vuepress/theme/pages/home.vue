<template lang="pug">
.Home
    Search
    .box
        iframe.dida(src='https://dida365.com/webapp')
        //- Juejin
        Navigation.box-nav
</template>

<script>
import Search from './widget/Search'
import Navigation from './widget/Navigation'
import Juejin from './widget/Juejin'
export default {
    name: 'Home',
    components: { Search, Navigation, Juejin },
}
</script>

<style scoped lang="stylus">
.Home {
    padding 70px 0
    min-height 100vh
    .box {
        display flex
        margin-top 30px
        justify-content center
    }
    .dida {
        margin 0 10px
        width 370px
        height 660px
        border 1px solid #dee3eb
    }
    .box-nav {
        margin 0 10px
        min-width 480px
    }
}
</style>
