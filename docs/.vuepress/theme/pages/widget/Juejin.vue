<template lang="pug">
.Juejin
    //- iframe.juejin(src='//e.juejin.cn')
</template>

<script>
import axios from 'axios'
export default {
    name: 'Navigation',
    data() {
        return {}
    },
    mounted() {
        const body = {
            cate_id: '6809637767543259144',
            client_type: 6587,
            cursor: '0',
            id_type: 2,
            limit: 20,
            sort_type: 300,
        }
        axios.post(
            'http://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7054333980195620387&aid=6587',
            body
        )
    },
}
</script>

<style scoped lang="stylus">
.Navigation {
}
</style>
