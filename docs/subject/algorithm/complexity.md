# 算法的时间与空间复杂度

## 时间复杂度

即执行当前算法所消耗的时间

先来看这样一个问题：下面这段代码，一共会执行多少次？

```js
function traverse(arr) {
    var len = arr.length
    for (var i = 0; i < len; i++) {
        console.log(arr[i])
    }
}
```

执行多少次取决于 `for` 循环的循环次数，假设数组的长度为 `n`，那么也就执行了 `n` 次

对应的时间复杂度就是 `O(n)`

若 `n` 是常数，则复杂度记为 `O(1)`

接下来我们看看规模为 `n * n` 的二维数组的遍历，一共需要执行多少次代码：

```js
function traverse(arr) {
    var outLen = arr.length
    for (var i = 0; i < outLen; i++) {
        var inLen = arr[i].length
        for (var j = 0; j < inLen; j++) {
            console.log(arr[i][j])
        }
    }
}
```

因为是两层循环，所以执行次数 `n * n = n²`，时间复杂度即为 `O(n²)`

如果是 N 维数组，需要循环 N 层，时间复杂度即为 `O(n^n)`

如果二维数组的规模是 `n * m`，则时间复杂度为 `O(n * m)`

常见的时间复杂度表达，除了多项式以外，还有`logn`。我们一起来看另一个算法：

```js
function fn(arr) {
    var len = arr.length
    for (var i = 1; i < len; i = i * 2) {
        console.log(arr[i])
    }
}
```

注意这里的递增循环体是 `i = i * 2`

假设循环了 `x` 次，那么 `i * 2` 执行了 `x` 次，即满足 `2 ^ x >= n` 时，停止循环。

`x` 解出来，就是大于等于以 2 为底数的 `n` 的对数

![image.png](https://cdn.superwen.cn/halo/502f05e6db457f1bf49c28be3595e255.png)

注意涉及到对数的时间复杂度，底数和系数都是要被简化掉的。那么这里的时间复杂度： `O(n) = logn`

## 空间复杂度

空间复杂度是对一个算法在运行过程中临时占用存储空间大小的量度。和时间复杂度相似，它是内存增长的趋势。

常见的空间复杂度有 `O(1)`、`O(n)` 和 `O(n^2)`

继续看这个例子:

```js
function traverse(arr) {
    var len = arr.length
    for (var i = 0; i < len; i++) {
        console.log(arr[i])
    }
}
```

占用空间的变量: `arr`、`len`、`i`。

后面尽管做了很多次循环，但是这些都是时间上的开销。循环体在执行时，并没有开辟新的内存空间。因此，整个 `traverse` 函数对内存的占用量是恒定的，它对应的空间复杂度就是 `O(1)`。

另一个例子，初始化一个规模为 `n` 的数组：

```js
function init(n) {
    var arr = []
    for (var i = 0; i < n; i++) {
        arr[i] = i
    }
    return arr
}
```

占用空间的变量: `arr`、`n`、`i`。

`arr` 最终的大小是由输入的 `n` 的大小决定的，它会随着 `n` 的增大而增大、呈一个线性关系。因此这个算法的空间复杂度就是` O(n)`。

同理，如果初始化一个规模为 `n * n` 的数组，那么他的空间复杂度就是 `O(n²)`
