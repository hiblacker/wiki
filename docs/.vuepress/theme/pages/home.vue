<template lang="pug">
.Home
    Search
    iframe.dida(src='https://dida365.com/webapp')
</template>

<script>
import Search from './widget/Search'
export default {
    name: 'Home',
    components: { Search },
}
</script>

<style scoped lang="stylus">
.Home {
    padding-top 5rem
    .dida {
        width 380px
        height 660px
        border 0
        box-shadow 2px 3px 15px rgba(8, 8, 8, 0.5)
        border-radius 10px
    }
}
</style>
