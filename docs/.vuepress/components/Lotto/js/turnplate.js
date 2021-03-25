export default class TurnPlate {
    // 扇形背景色
    color = ['#FFEDED', '#FFD9AC', '#FFCBBD']
    PI = Math.PI
    // 起始角度
    rotateStartRadian = Math.PI / 2
    dpr = 2
    isCanTurn = true
    // 圆心的坐标
    x = 188.8
    y = 156.7
    // 圆盘半径
    r = 134
    // 按屏幕宽度算出实际屏幕和750设计稿的比例
    key = 1
    // 图片的线上地址
    imgUrlArr = []
    // 下载图片数组
    imgLoadArr = []
    /**
     * 订阅器
     * finished: 转盘结束时触发
     * eg: const instance = new Turnplate(opt)
     *  instance.on('finished', function() { console.log('finished') })
     */
    subs = {}
    constructor(domObj, { options, preview }) {
        const { x, y, r } = this
        this.canvas = domObj.rotatePlate
        this.width = domObj.width
        this.height = domObj.height
        this.options = options
        this.preview = preview
        this.imgUrlArr = options.map(obj => obj.iconUrl)
        this.key = (domObj.width / 750) * 2
        this.x = x * this.key
        this.y = y * this.key
        this.r = r * this.key
        this.context = this.canvas.getContext('2d')
    }
    async init() {
        const { width, height, canvas, imgLoadArr, dpr } = this
        canvas.width = width * dpr
        canvas.height = height * dpr
        this.context.scale(dpr, dpr)
        if (imgLoadArr.length === 0) {
            this.imgLoadArr = await this.downloadImgs(this.imgUrlArr)
        }
        this.drawPrizeBlock()
    }
    // 画扇形块
    drawPrizeBlock() {
        const { options, context, x, y, r, PI, color, key } = this
        const awardLength = options.length
        let startRadian = this.rotateStartRadian
        let radianGap = (2 * this.PI) / awardLength
        let endRadian = startRadian + radianGap
        options.forEach((v, i) => {
            context.save()
            context.beginPath()
            if (awardLength % 2 === 0) {
                context.fillStyle = color[i % 2]
            } else {
                if (i + 1 == awardLength) {
                    context.fillStyle = '#FFCBBD'
                } else {
                    context.fillStyle = color[i % 2]
                }
            }

            context.moveTo(x, y)
            context.arc(x, y, r, startRadian, endRadian, false)
            context.fill()
            context.restore()
            // 文字
            context.save()
            context.fillStyle = '#C85F3A'
            context.font = Math.ceil(13 * key) + 'px system-ui'
            // 改变canvas原点的位置,简单来说,translate到哪个坐标点,那么那个坐标点就将变为坐标(0, 0)
            context.translate(
                x + Math.cos(startRadian + radianGap / 2) * r,
                y + Math.sin(startRadian + radianGap / 2) * r
            )
            // 旋转角度，相对原点进行
            context.rotate(startRadian + radianGap / 2 + PI / 2)
            let width = this.imgLoadArr[i].width
            let height = this.imgLoadArr[i].height
            // 拿到宽高比
            let aspectRatio = width / height
            if (width > height) {
                width = 40 * key
                height = width / aspectRatio
            } else {
                height = 40 * key
                width = height * aspectRatio
            }
            context.drawImage(this.imgLoadArr[i], -width / 2, 30 * key, width, height)
            context.fillText(v.level, -13 * (v.level.length / 2) * key, 20 * key)
            context.restore()
            startRadian += radianGap
            endRadian += radianGap
        })
    }
    distanceToStop(result) {
        const { options, preview } = this
        // middleDegrees为奖品块的中间角度（我们最终停留都是以中间角度进行计算的）距离初始的startRadian的距离，distance就是当前奖品跑到指针位置要转动的距离。
        let middleDegrees = 0,
            distance = 0
        // 映射出每个奖品的middleDegrees
        const awardsToDegreesList = options.map((data, index) => {
            let awardRadian = (Math.PI * 2) / options.length
            return (
                awardRadian * index +
                (awardRadian * (index + 1) - awardRadian * index) / 2
            )
        })
        const currentPrizeIndex = preview ? result.prizeId + 1 : result.orderId
        middleDegrees = awardsToDegreesList[currentPrizeIndex - 1]
        // 因为指针是垂直向上的，相当坐标系的Math.PI/2,所以我们这里要进行判断来移动角度
        distance = (Math.PI * 3) / 2 - middleDegrees
        distance = distance > 0 ? distance : Math.PI * 2 + distance
        // 这里额外加上后面的值，是为了让转盘多转动几圈，看上去更像是在抽奖
        return distance + Math.PI * 800
    }
    // 旋转
    startRotate(result) {
        this.init()
        const { isCanTurn, context } = this
        if (!isCanTurn) return
        this.isCanTurn = false
        // let postion = this.windowToCanvas(canvas)
        context.beginPath()
        context.arc(150, 150, 30, 0, Math.PI * 2, false)
        // 每次点击抽奖，我们都将初始化角度重置
        this.rotateStartRadian = 0
        // distance是我们计算出的将指定奖品旋转到指针处需要旋转的角度距离，distanceToStop下面会又说明
        const distance = this.distanceToStop(result)
        this.startTime = +new Date()
        return this.rotatePanel(distance)
    }
    rotatePanel(distance, t) {
        // if (this.lastTime) console.log('FPS:', ~~(1000 / (t - this.lastTime)))
        this.lastTime = t || 0
        // 我们这里用一个很简单的缓动函数来计算每次绘制需要改变的角度，这样可以达到一个转盘从块到慢的渐变的过程
        let changeRadian = (distance - this.rotateStartRadian) / 18
        this.rotateStartRadian += changeRadian
        // 当最后我们的目标距离与startRadian之间的差距低于0.02时，我们就默认奖品抽完了，可以继续抽下一个了。
        if (distance - this.rotateStartRadian <= 0.01) {
            this.isCanTurn = true
            this.emit('finished')
            console.log('抽奖消耗时间', +new Date() - this.startTime)
            return true
        }
        this.init()
        window.requestAnimationFrame(t => this.rotatePanel(distance, t))
    }
    // 加载所有奖品图
    downloadImgs(imgArr) {
        const load = src => {
            return new Promise(resolve => {
                const img = new Image()
                img.src = src
                img.onload = () => {
                    resolve(img)
                }
            })
        }
        return Promise.all(imgArr.map(load))
    }
    /**
     * 订阅器
     * @param {String} type 事件类型
     * @param {Function} callback 回调函数
     */
    on(type, callback) {
        if (this.subs[type]) {
            if (this.subs[type].includes(callback)) return
            this.subs[type].push(callback)
        } else this.subs[type] = [callback]
    }
    /**
     * 发布器
     * @param {String} type 事件类型
     * @param {Array} args 参数
     */
    emit(type, args = []) {
        if (!this.subs[type]) return
        let event = {
            type,
            args,
        }
        const len = this.subs[type].length
        //遍历执行函数
        for (let i = 0; i < len; i++) {
            //依次执行注册消息对应的方法
            this.subs[type][i].call(this, event)
        }
    }
}
