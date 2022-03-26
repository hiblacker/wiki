/**
 * 杨辉三角2
 * 简单
 * https://leetcode-cn.com/problems/pascals-triangle-ii/
 */

//  119. 杨辉三角 II
//  给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行。

//  在「杨辉三角」中，每个数是它左上方和右上方的数的和。

//  示例 :

//  输入: rowIndex = 0
//  输出: [1]

//  输入: rowIndex = 1
//  输出: [1,1]

//  输入: rowIndex = 2
//  输出: [1,2,1]

//  输入: rowIndex = 3
//  输出: [1,3,3,1]

//  输入: rowIndex = 4
//  输出: [1,4,6,4,1]

//  提示:

//  0 <= rowIndex <= 33

//  进阶：

//  你可以优化你的算法到 O(rowIndex) 空间复杂度吗？

// 方法一：递推
// 杨辉三角，是二项式系数在三角形中的一种几何排列。它是中国古代数学的杰出研究成果之一，它把二项式系数图形化，把组合数内在的一些代数性质直观地从图形中体现出来，是一种离散型的数与形的结合。

// 杨辉三角具有以下性质：

// 1. 每行数字左右对称，由 1 开始逐渐变大再变小，并最终回到 1。

// 第 n 行（从 0 开始编号）的数字有 n+1 项，前 n 行共有 n * (n + 1) / 2 个数。​

// 每个数字等于上一行的左右两个数字之和，可用此性质写出整个杨辉三角。

// 依据性质 4，我们可以一行一行地计算杨辉三角。每当我们计算出第 i 行的值，我们就可以在线性时间复杂度内计算出第 i+1 行的值。

// 代码

// C++JavaGolangJavaScriptC

// class Solution {
// public:
//     vector<int> getRow(int rowIndex) {
//         vector<vector<int>> C(rowIndex + 1);
//         for (int i = 0; i <= rowIndex; ++i) {
//             C[i].resize(i + 1);
//             C[i][0] = C[i][i] = 1;
//             for (int j = 1; j < i; ++j) {
//                 C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
//             }
//         }
//         return C[rowIndex];
//     }
// };
// 优化

// 注意到对第 i+1 行的计算仅用到了第 i 行的数据，因此可以使用滚动数组的思想优化空间复杂度。

// var getRow = function(rowIndex) {
//     const C = new Array(rowIndex + 1).fill(0);
//     for (let i = 0; i <= rowIndex; ++i) {
//         C[i] = new Array(i + 1).fill(0);
//         C[i][0] = C[i][i] = 1;
//         for (let j = 1; j < i; j++) {
//             C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
//         }
//     }
//     return C[rowIndex];
// };
// 进一步优化

// 能否只用一个数组呢？

// 递推式 \mathcal{C}_n^i=\mathcal{C}_{n-1}^i+\mathcal{C}_{n-1}^{i-1}C
// n
// i
// ​
//  =C
// n−1
// i
// ​
//  +C
// n−1
// i−1
// ​
//   表明，当前行第 i 项的计算只与上一行第 i-1 项及第 i 项有关。因此我们可以倒着计算当前行，这样计算到第 i 项时，第 i-1 项仍然是上一行的值。

// var getRow = function(rowIndex) {
//     let pre = [], cur = [];
//     for (let i = 0; i <= rowIndex; ++i) {
//         cur = new Array(i + 1).fill(0);
//         cur[0] = cur[i] =1;
//         for (let j = 1; j < i; ++j) {
//             cur[j] = pre[j - 1] + pre[j];
//         }
//         pre = cur;
//     }
//     return pre;
// };
// 复杂度分析

// 时间复杂度：O(\textit{rowIndex}^2)O(rowIndex
// 2
//  )。

// 空间复杂度：O(1)O(1)。不考虑返回值的空间占用。

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
    const length = rowIndex + 1
    let result = [1]
    if (rowIndex > 0) result[1] = rowIndex
    let n = 1
    while (n < rowIndex) {
        n++
    }
    return result
}
