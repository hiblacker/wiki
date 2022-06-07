# 蓝湖面试准备

## 算法

1. 找出一个数组中出现次数最多的数

```js
const findMax = arr =>
    arr.reduce(
        (acc, cur) => (
            acc[cur] ? ++acc[cur] > acc.max && (acc.max = cur) : (acc[cur] = 1), acc
        ),
        { max: 0 }
    )
```

2. 基础算法
