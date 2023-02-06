<template lang="pug">
.Home
    Search
    .box
        Feed.feed
        Navigation.box-nav
</template>

<script>
import Search from './widget/Search'
import Navigation from './widget/Navigation'
import Feed from './widget/Feed'
export default {
    name: 'Home',
    components: { Search, Navigation, Feed },
}
</script>

<style scoped lang="stylus">
.Home {
    padding 70px 50px
    min-height 100vh
    .box {
        display flex
        margin 30px 0 0
        justify-content center
    }
    .feed {
        min-width 350px
        max-width 500px
    }
    .box-nav {
        margin-left 20px
        min-width 480px
    }
}
</style>
