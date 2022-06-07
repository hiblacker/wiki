/**
 * 最大子序和
 * 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
 * 输出：6
 * 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
 * @param {number[]} nums
 * @return {number}
 */
// 贪心算法
var maxSubArray = function (nums) {
    let cur = 0,
        max = Number.MIN_SAFE_INTEGER
    nums.forEach(num => {
        cur += num
        if (cur >= max) max = cur
        if (cur < 0) cur = 0
    })
    return max
}
// 动态规划
var maxSubArray2 = function (nums) {
    return Math.max(
        ...nums.reduce(
            (acc, cur, i) => (acc.push(acc[i - 1] > 0 ? acc[i - 1] + cur : cur), acc),
            []
        )
    )
}
