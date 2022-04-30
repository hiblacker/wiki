<template>
    <header class="navbar">
        <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

        <RouterLink :to="$localePath" class="home-link">
            <img
                v-if="$site.themeConfig.logo"
                class="logo"
                :src="$withBase($site.themeConfig.logo)"
                :alt="$siteTitle"
            />
            <span
                v-if="$siteTitle"
                ref="siteName"
                class="site-name"
                :class="{ 'can-hide': $site.themeConfig.logo, ok: word }"
                >{{ word }}</span
            >
        </RouterLink>

        <div
            class="links"
            :style="
                linksWrapMaxWidth
                    ? {
                          'max-width': linksWrapMaxWidth + 'px',
                      }
                    : {}
            "
        >
            <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia" />
            <SearchBox
                v-else-if="
                    $site.themeConfig.search !== false &&
                    $page.frontmatter.search !== false
                "
            />
            <NavLinks class="can-hide" />
        </div>
    </header>
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@parent-theme/components/SidebarButton.vue'
import NavLinks from '@parent-theme/components/NavLinks.vue'
export default {
    name: 'Navbar',
    components: {
        SidebarButton,
        NavLinks,
        SearchBox,
        AlgoliaSearchBox,
    },
    data() {
        return {
            linksWrapMaxWidth: null,
            word: '',
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
    created() {
        const script = document.createElement('script')
        script.src = 'https://sdk.jinrishici.com/v2/browser/jinrishici.js'
        document.head.appendChild(script)
        script.onload = () => {
            jinrishici.load(result => {
                this.word = result.data.content
                this.$nextTick(() => {
                    this.resize()
                })
            })
        }
    },
    mounted() {
        this.NAVBAR_VERTICAL_PADDING =
            parseInt(css(this.$el, 'paddingLeft')) +
            parseInt(css(this.$el, 'paddingRight'))
        this.resize()
        window.addEventListener('resize', () => this.resize(), false)
    },
    methods: {
        resize() {
            if (document.documentElement.clientWidth < this.MOBILE_DESKTOP_BREAKPOINT) {
                this.linksWrapMaxWidth = null
            } else {
                this.linksWrapMaxWidth =
                    this.$el.offsetWidth -
                    this.NAVBAR_VERTICAL_PADDING -
                    ((this.$refs.siteName && this.$refs.siteName.offsetWidth) || 0)
            }
        },
    },
}
function css(el, property) {
    // NOTE: Known bug, will return 'auto' if style value is 'auto'
    const win = el.ownerDocument.defaultView
    // null means not to return pseudo styles
    return win.getComputedStyle(el, null)[property]
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
    .site-name {
        font-size 1.1rem
        font-weight 600
        color $textColor
        position relative
        &::after {
            content ''
            position absolute
            left 0
            top 0
            bottom 0
            right 0
            background #fff
            transition 2s cubic-bezier(0.29, 1, 0.29, 1)
            transform scale(1)
            transform-origin right center
        }
        &.ok::after {
            transform scale(0, 1)
        }
    }
    .links {
        padding-left 1.5rem
        box-sizing border-box
        background-color white
        white-space nowrap
        font-size 0.9rem
        position absolute
        right $navbar-horizontal-padding
        top $navbar-vertical-padding
        display flex
        transition .35s
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
