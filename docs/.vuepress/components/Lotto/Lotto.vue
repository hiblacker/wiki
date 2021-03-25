<template lang="pug">
.turn-plate
    #canvas.plate
        .rotate-btn.flex-cc(@click='rotate')
            .i 点击 #[i 抽奖]
            img(
                src='https://nuoxin-virtual-rep-storage.oss-cn-beijing.aliyuncs.com/points_mall/goods_view/2021022610/de3eb0850a024883a7b6e1ae624b3416.png'
            )
            img.active(
                src='https://nuoxin-virtual-rep-storage.oss-cn-beijing.aliyuncs.com/points_mall/goods_view/2021022610/4cc5dae2822541778f3c40174da95ab2.png'
            )
</template>

<script>
import TurnPlate from './js/turnplate'
import Light from './js/light'
export default {
    name: 'Lotto',
    data() {
        return {
            newPlate: null,
            // 屏幕宽度
            windowWidth: 375,
            light: null,
        }
    },
    computed: {
        computedTitle() {
            // 标题最大宽度，超过之后会换行
            const maxWidth = ~~((this.windowWidth / 375) * 315)
            const size = ~~((this.windowWidth / 375) * 50)
            const title = this.title
            if (!title) return false
            const width = this.measure(title, size)
            return {
                show: width < maxWidth,
                // 大于两行的话，增加class
                small: maxWidth * 2 < width + 20,
            }
        },
    },
    methods: {
        // 由父组件调用
        draw() {
            return Promise.all([this.drawPlate(), this.drawLight()])
        },
        async drawPlate() {
            if (this.preview) {
                const thanksObj = {
                    iconUrl:
                        'https://nuoxin-virtual-rep-storage.oss-cn-beijing.aliyuncs.com/points_mall/goods_view/2021030210/ce86bb6f8be046b1a56935e412578511.png',
                    isMiss: 1,
                    level: '谢谢惠顾',
                    url:
                        'https://nuoxin-virtual-rep-storage.oss-cn-beijing.aliyuncs.com/points_mall/goods_view/2021030210/ce86bb6f8be046b1a56935e412578511.png',
                }
                this.$store.commit('lotto/PREVIEW_HOME_DATA', thanksObj)
            }
            const plate = document.querySelector('.plate')
            const width = plate.offsetWidth
            const height = plate.offsetHeight
            let rotatePlate = document.querySelector('.plate .rotatePlate')
            if (!rotatePlate) {
                rotatePlate = document.createElement('canvas')
                rotatePlate.className = 'rotatePlate'
                rotatePlate.style.position = 'absolute'
                rotatePlate.style.width = width + 'px'
                rotatePlate.style.width = height + 'px'
                plate.appendChild(rotatePlate)
            }
            let domObj = {
                rotatePlate,
                width,
                height,
            }
            this.newPlate = new TurnPlate(domObj, {
                options: this.homeData.lotteryAwards,
                preview: this.preview,
            })
            await this.newPlate.init()
        },
        async drawLight() {
            const plate = document.querySelector('.plate')
            const width = plate.offsetWidth
            const height = plate.offsetHeight
            const light = document.createElement('canvas')
            light.style.position = 'absolute'
            light.style.width = width + 'px'
            light.style.width = height + 'px'
            plate.appendChild(light)
            let lightObj = {
                light,
                width,
                height,
            }
            this.light = new Light(lightObj)
            await this.light.init()
        },
        jump() {
            uni.navigateTo({ url: '/pages-activity/lotto/my-prize' })
        },
        receiveMessage({ data }) {
            if (data?.source !== 'ops') return
            console.log({ data })
            this.title = data.title
        },
        async rotate() {
            if (!this.isCanRotate) return
            if (this.homeData.lotteryNumForDay < 1) {
                uni.showToast({
                    title: '您今日次数已用完',
                    icon: 'none',
                })
                return
            }
            this.$emit('setRotateFlag', false)
            // 奖品
            let result
            if (this.preview) {
                this.$store.commit('lotto/SET_LOTTOERY_NUM')
                const index = Math.floor(
                    Math.random() * this.homeData.lotteryAwards.length
                )
                result = this.homeData.lotteryAwards[index]
                result.prizeId = index
                this.newPlate.startRotate(result)
            } else {
                this.$store
                    .dispatch('lotto/lotteryDraw')
                    .then(res => {
                        // 抽到奖品并且我的奖品标签是没有显示的情况，重新调用接口
                        if (res.data.isMiss === 0 && !this.homeData.isShowMyPrize) {
                            const id = uni.getStorageSync('lotto-id')
                            this.$store.dispatch('lotto/getHomeData', id)
                        }
                        this.$store.commit('lotto/SET_LOTTOERY_NUM')
                        if (res.data.activityId) {
                            this.newPlate.startRotate(res.data)
                            result = res.data
                        }
                    })
                    .catch(() => this.$emit('setRotateFlag', true))
            }
            this.newPlate.on('finished', () => this.$emit('lottoResult', result))
        },
    },
}
</script>

<style scoped lang="stylus">
.turn-plate {
    width 100%
    height auto
    position relative
    background url('https://nuoxin-virtual-rep-storage.oss-cn-beijing.aliyuncs.com/virtual_ops/image/2021022216/4f37f959e5954191be83c9475e5868a2.png') no-repeat center
    background-size 100%
    padding-bottom 57upx
    padding-top 90upx
    user-select none
    .btn {
        position absolute
        right 0
        top 53rpx
        height 65rpx
        width 146rpx
        font-size 28rpx
        font-weight 500
        color #fff
        background url('https://nuoxin-virtual-rep-storage.oss-cn-beijing.aliyuncs.com/virtual_ops/image/2021022016/02e23062b76d448b933698a743d35761.png') right center no-repeat
        background-size cover
    }
    .plate {
        position relative
        width 100%
        height 744upx
        margin-top 34upx
        background url('https://nuoxin-virtual-rep-storage.oss-cn-beijing.aliyuncs.com/points_mall/goods_view/2021030211/b944af6f74da4f32b38fbe28d04921c7.png') center no-repeat
        background-size contain
        .rotate-btn {
            z-index 2
            top 171upx
            left 50%
            transform translateX(-50%)
            position absolute
            width 174upx
            height 230upx
            .i {
                padding-top 40rpx
                color #fff
                line-height 1.2
                position relative
                z-index 3
                i {
                    display block
                }
            }
            img {
                position absolute
                left 0
                top 0
                width 100%
                &.active {
                    opacity 0
                }
            }
            &:active {
                .i {
                    transform scale(0.88)
                }
                img {
                    opacity 0
                }
                .active {
                    opacity 1
                }
            }
        }
        .draw-count {
            display flex
            z-index 2
            bottom 6upx
            left 50%
            position absolute
            transform translate(-50%, 0)
            font-size 22upx
            color #FEFFFF
            align-items center
            .num {
                color #FFD949
                font-size 26upx
                font-weight 500
            }
        }
    }
}
</style>
