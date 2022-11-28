/**
 * 二叉树遍历
 */

// 树结构
const data = {
    val: 'A',
    left: {
        val: 'B',
        left: {
            val: 'D',
            left: {
                val: 'E',
            },
            right: {
                val: 'F',
            },
        },
    },
    right: {
        val: 'C',
        left: null,
        right: {
            val: 'F',
            right: {
                val: 'G',
            },
        },
    },
}
// 先序遍历 根 -> 左 -> 右
function preorder(node) {
    if (!node?.val) return
    console.log(node.val)
    preorder(node.left)
    preorder(node.right)
}
// 中序遍历  左 -> 根 -> 右
function preorder(node) {
    if (!node?.val) return
    preorder(node.left)
    console.log(node.val)
    preorder(node.right)
}
// 后序遍历  左 -> 右 -> 根
function preorder(node) {
    if (!node?.val) return
    preorder(node.left)
    preorder(node.right)
    console.log(node.val)
}

