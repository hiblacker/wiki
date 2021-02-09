<template lang="pug">
.Home
    Search
</template>

<script>
import Search from "./widget/Search";
export default {
    name: "Home",
    components: { Search },
};
</script>

<style scoped lang="stylus">
.Home {
    padding-top 5rem
}
</style>
