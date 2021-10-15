<template lang="pug">
.Blank(:style='{height: `${height}px`}')
</template>

<script>
export default {
    name: 'Blank',
    props: {
        height: {
            default: 500,
            type: String | Number,
        },
    },
}
</script>

<style scoped lang="stylus">
.Blank {
}
</style>
