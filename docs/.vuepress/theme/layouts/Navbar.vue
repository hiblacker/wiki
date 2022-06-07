<template lang="pug">
header.navbar
    SidebarButton(@toggle-sidebar='$emit("toggle-sidebar")')
    RouterLink.home-link(:to='$localePath')
        img.logo(
            v-if='$site.themeConfig.logo',
            :alt='$siteTitle',
            :src='$withBase($site.themeConfig.logo)'
        )
        Slogan(v-if='$siteTitle', @resize='resize', ref='siteName')
    .links(:style='linksWrapMaxWidth ? { "max-width": linksWrapMaxWidth + "px" } : {}')
        AlgoliaSearchBox(v-if='isAlgoliaSearch', :options='algolia')
        SearchBox(
            v-else-if='$site.themeConfig.search !== false && $page.frontmatter.search !== false'
        )
        NavLinks.can-hide
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import Slogan from './widget/Slogan.vue'
import SidebarButton from '@parent-theme/components/SidebarButton.vue'
import NavLinks from '@parent-theme/components/NavLinks.vue'
export default {
    name: 'Navbar',
    components: {
        SidebarButton,
        NavLinks,
        Slogan,
        SearchBox,
        AlgoliaSearchBox,
    },
    data() {
        return {
            linksWrapMaxWidth: null,
            MOBILE_DESKTOP_BREAKPOINT: 719,
            NAVBAR_VERTICAL_PADDING: 719,
        }
    },
    computed: {
        algolia() {
            return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
        },
        isAlgoliaSearch() {
            return this.algolia && this.algolia.apiKey && this.algolia.indexName
        },
    },
    mounted() {
        this.sizeCalc()
        this.resize()
        window.addEventListener('resize', () => this.resize(), false)
    },
    methods: {
        sizeCalc() {
            this.NAVBAR_VERTICAL_PADDING =
                parseInt(css(this.$el, 'paddingLeft')) +
                parseInt(css(this.$el, 'paddingRight'))
            function css(el, property) {
                // NOTE: Known bug, will return 'auto' if style value is 'auto'
                const win = el.ownerDocument.defaultView
                // null means not to return pseudo styles
                return win.getComputedStyle(el, null)[property]
            }
        },
        resize() {
            if (document.documentElement.clientWidth < this.MOBILE_DESKTOP_BREAKPOINT) {
                this.linksWrapMaxWidth = null
            } else {
                const logo = this.$refs.siteName.$el
                const logoWidth = logo && logo.offsetWidth
                this.linksWrapMaxWidth =
                    this.$el.offsetWidth - this.NAVBAR_VERTICAL_PADDING - (logoWidth || 0)
            }
        },
    },
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem
.navbar {
    padding $navbar-vertical-padding $navbar-horizontal-padding
    line-height: $navbarHeight - 1.4rem
    a, span, img {
        display inline-block
    }
    .logo {
        height: $navbarHeight - 1.4rem
        min-width: $navbarHeight - 1.4rem
        margin-right 0.8rem
        vertical-align top
    }
    .links {
        margin-left 1.5rem
        box-sizing border-box
        background-color white
        white-space nowrap
        font-size 0.9rem
        position absolute
        right $navbar-horizontal-padding
        top $navbar-vertical-padding
        display flex
        transition 0.35s
        .search-box {
            flex 0 0 auto
            vertical-align top
        }
    }
}
@media (max-width $MQMobile) {
    .navbar {
        padding-left 4rem
        .can-hide {
            display none
        }
        .links {
            padding-left 1.5rem
        }
        .site-name {
            width calc(100vw - 9.4rem)
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
        }
    }
}
</style>
