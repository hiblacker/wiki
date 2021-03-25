export default class Light {
    /**
     * canvasObj
     *  light： 当前的canvas对象
     *  width&&height 当前canvas对象的宽高
     **/
    dpr = 2
    PI = Math.PI
    // 转盘圆心横纵坐标
    x = 191
    y = 156.5
    // 转盘半径
    r = 137
    // 比例
    key = 1
    // 小黄灯和小粉灯的图片地址
    light = [
        'https://nuoxin-virtual-rep-storage.oss-cn-beijing.aliyuncs.com/points_mall/goods_view/2021021914/d44af61a25be42109854690d80163cb0.png',
        'https://nuoxin-virtual-rep-storage.oss-cn-beijing.aliyuncs.com/points_mall/goods_view/2021021914/060daaddb18f4a1e8849199ae6c92e16.png',
    ]
    // 缓存 light 中所有图片加载好后的 Image 对象
    images = []
    // 控制取到相反颜色灯的背景地址
    flag = true
    //我们自己定义的动画时间差值
    diffTime = 1000
    constructor(canvasObj) {
        const { dpr } = this
        this.canvas = canvasObj.light
        this.canvas.width = canvasObj.width * dpr
        this.canvas.height = canvasObj.width * dpr
        this.context = this.canvas.getContext('2d')
        this.width = canvasObj.width
        this.height = canvasObj.height
        this.context.scale(dpr, dpr)
    }
    async init() {
        const { width, x, y, r } = this
        this.key = (width / 750) * 2
        this.x = x * this.key
        this.y = y * this.key
        this.r = r * this.key
        this.images = await this.downloadImgs()
        this.twinkle()
        this.drawLight()
    }
    async twinkle() {
        const { diffTime } = this
        setTimeout(() => {
            this.flag = !this.flag
            this.twinkle()
            this.drawLight()
        }, diffTime)
    }
    // 画所有的灯
    async drawLight() {
        const { context, r, x, y, width, height, key } = this
        context.clearRect(0, 0, width, height)
        let index = 0
        // 将坐标系移动到转盘圆心
        context.translate(x, y)
        while (index < 16) {
            // 取到相反颜色的灯的地址
            let lightKey = this.flag ? index % 2 : (index + 1) % 2
            this.drawImg(
                17 * key,
                17 * key,
                this.images[lightKey],
                r + (y - r - 17 * key) / 2,
                0
            )
            index++
        }
        // 画完一次让坐标系恢复到原始状态
        context.setTransform(1, 0, 0, 1, 0, 0)
        this.context.scale(this.dpr, this.dpr)
    }
    // 加载所有灯
    downloadImgs() {
        const load = src => {
            return new Promise(resolve => {
                const img = new Image()
                img.src = src
                img.onload = () => {
                    resolve(img)
                }
            })
        }
        return Promise.all(this.light.map(load))
    }
    // 具体画每一个灯
    drawImg(width, height, img, x, y) {
        const { context, xy, PI } = this
        let angleStep = (2 * PI) / 16
        context.drawImage(img, x, y, xy(width), xy(height))
        context.rotate(angleStep)
    }
    // 设计图宽度为750，转换成坐标
    xy = val => {
        return val
    }
}
