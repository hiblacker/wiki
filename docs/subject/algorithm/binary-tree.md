# 二叉树

## 树结构

数据结构中的树，首先是对现实世界中树的一层简化：把树根抽象为“根结点”，树枝抽象为“边”，树枝的两个端点抽象为“结点”，树叶抽象为“叶子结点”。抽象后的树结构如下：
![image.png](https://cdn.superwen.cn/halo/8c46f092ed93e9c45dcf8e701fbb13c6.png)

把这棵抽象后的树颠倒一下，就得到了计算机中的树结构：

![image.png](https://cdn.superwen.cn/halo/59a7492cf1547eed6b42da3b52307c17.png)

树的关键特性和重点概念：

-   树的层次计算规则：根结点所在的那一层记为第一层，其子结点所在的就是第二层，以此类推。
-   结点和树的“高度”计算规则：叶子结点高度记为 1，每向上一层高度就加 1，逐层向上累加至目标结点时，所得到的的值就是目标结点的高度。树中结点的最大高度，称为“树的高度”。
-   “度”的概念：一个结点开叉出去多少个子树，被记为结点的“度”。比如我们上图中，根结点的“度”就是 3。
-   “叶子结点”：叶子结点就是度为 0 的结点。在上图中，最后一层的结点的度全部为 0，所以这一层的结点都是叶子结点。

## 二叉树结构

二叉树是指满足以下要求的树：

-   它可以没有根结点，作为一棵空树存在
-   如果它不是空树，那么**必须由根结点、左子树和右子树组成，且左右子树都是二叉树**。如下图：

![image.png](https://cdn.superwen.cn/halo/59a7492cf1547eed6b42da3b52307c17.png)

注意，二叉树不能被简单定义为每个结点的度都是 2 的树。普通的树并不会区分左子树和右子树，但在二叉树中，左右子树的位置是严格约定、不能交换的。对应到图上来看，也就意味着 B 和 C、D 和 E、F 和 G 是不能互换的。

## 二叉树的编码实现

在 JS 中，二叉树使用对象来定义。它的结构分为三块：

-   数据域
-   左侧子结点（左子树根结点）的引用
-   右侧子结点（右子树根结点）的引用

在定义二叉树构造函数时，我们需要把左侧子结点和右侧子结点都预置为空：

```js
// 二叉树结点的构造函数
function TreeNode(val) {
    this.val = val
    this.left = this.right = null
}

// 新建二叉树节点
const node = new TreeNode(1)
```

一棵二叉树的形态实际是这样的：
![image.png](https://cdn.superwen.cn/halo/6fe1ff217fff65ebd5b79a9c403927d1.png)

## 二叉树遍历

按照顺序规则的不同，遍历方式有以下四种：

-   先序遍历
-   中序遍历
-   后序遍历
-   层次遍历

按照实现方式的不同，遍历方式又可以分为以下两种：

-   递归遍历（先、中、后序遍历）
-   迭代遍历（层次遍历）

层次遍历的考察相对比较孤立，这里我们重点看先、中、后序遍历三兄弟。

### 递归

结合这个定义来看，每一棵二叉树都应该由这三部分组成：
![image.png](https://cdn.superwen.cn/halo/ab70ce390d4e327f6f6ee61a6fa5ae82.png)
对树的遍历，就可以看做是对这三个部分的遍历。基于‘左先于右’前提，排列组合后有以下三种顺序：

-   根结点 -> 左子树 -> 右子树
-   左子树 -> 根结点 -> 右子树
-   左子树 -> 右子树 -> 根结点

上述三个遍历顺序，就分别对应了二叉树的先序遍历、中序遍历和后序遍历规则。

在这三种顺序中，根结点的遍历分别被安排在了首要位置、中间位置和最后位置。 所谓的“先序”、“中序”和“后序”，“先”、“中”、“后”其实就是指根结点的遍历时机。

示例二叉树：
![image.png](https://cdn.superwen.cn/halo/d1c6334b835e0f520b495d10b9b305f8.png)

```js
const tree = {
    val: 'A',
    left: {
        val: 'B',
        left: {
            val: 'D'
        },
        right: {
            val: 'E'
        }
    },
    right: {
        val: 'C',
        right: {
            val: 'F'
        }
    }
}
```
#### 先序遍历
即：根结点 -> 左子树 -> 右子树

```js
function preorder(node) {
    if (!node) return
    console.log(node.val)
    preorder(node.left)
    preorder(node.right)
}
```

#### 中序遍历
即：左子树 -> 根结点 -> 右子树

```js
function inorder(node) {
    if (!node) return
    preorder(node.left)
    console.log(node.val)
    preorder(node.right)
}
```
#### 后序遍历
即：左子树 -> 根结点 -> 右子树

```js
function lastorder(node) {
    if (!node) return
    preorder(node.left)
    preorder(node.right)
    console.log(node.val)
}
```

三种遍历很简单，背下来。
