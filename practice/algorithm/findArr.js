// 写出一个函数trans，将数字转换成汉语的输出，输入为不超过10000亿的数字
// trans(123456) —— 十二万三千四百五十六
// trans（100010001）—— 一亿零一万零一

function trans(num) {
    const unit = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千']
    const numObj = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    const arr = String(num).split('')
    const len = arr.length
    if (len > 12) return console.log('error')
    const str = arr.map((i, k) => numObj[i] + unit[len - k - 1]).join('')
    let res = str
        .replace(/零[千百十]/g, '零')
        .replace(/零+/g, '零')
        .replace(/零亿/g, '亿')
        .replace(/零万/g, '万')
        .replace(/^一十/, '十')
        .replace(/零$/, '')
    console.log(res)
    return res
}
trans(101001213123)
trans(123456)
// public static String number2chinese(int src) {
// 	final String num[] = {"零", "一", "二", "三", "四", "五", "六", "七", "八", "九"};
// 	final String unit[] = {"", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千"};
// 	String dst = "";
// 	int count = 0;
// 	while(src > 0) {
// 		dst = (num[src % 10] + unit[count]) + dst;
// 		src = src / 10;
// 		count++;
// 	}
// 	return dst.replaceAll("零[千百十]", "零").replaceAll("零+万", "万")
// 			.replaceAll("零+亿", "亿").replaceAll("亿万", "亿零")
// 			.replaceAll("零+", "零").replaceAll("零$", "");
// }
