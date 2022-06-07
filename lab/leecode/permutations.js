// 全排列
// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

// 示例 1：
// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// 示例 2：
// 输入：nums = [0,1]
// 输出：[[0,1],[1,0]]

// 示例 3：
// 输入：nums = [1]
// 输出：[[1]]

// 提示：
// 1 <= nums.length <= 6
// -10 <= nums[i] <= 10
// nums 中的所有整数 互不相同

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// var permute = function (nums) {
//     const result = [],
//         path = [],
//         len = nums.length
//     dfs([])
//     return result

//     function dfs(used) {
//         if (path.length == len) {
//             result.push([...path])
//             return
//         }

//         for (let n in nums) {
//             if (used[n]) continue
//             used[n] = true
//             path.push(nums[n])
//             dfs(used)
//             path.pop()
//             used[n] = false
//         }
//     }
// }

/**
 * [1,2,3]
 * [1,2],
 */
var permute2 = function (n, k) {
    const result = [],
        path = []
    dfs([], 1)
    return result

    function dfs(used, m) {
        if (path.length == k) {
            result.push([...path])
            return
        }

        for (let i = m; i <= n; i++) {
            if (used[i]) continue
            if (path[path.length-1] > i) continue
            used[i] = true
            path.push(i)
            dfs(used, m+1)
            path.pop()
            used[i] = false
        }
    }
}

console.log(permute2(4,2))

