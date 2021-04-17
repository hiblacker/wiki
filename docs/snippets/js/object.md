# 操作 Object 常用方法

## isValid: 有效值

```js
export function isValid(val) {
    return !!val || val === 0
}
```

## pick: 挑选属性，返回新对象

浅拷贝

```js
/**
 * 返回指定属性后的对象, 不改变源对象
 * 参考 lodash : https://lodash.com/docs/4.17.15#pick
 * @param {Object} obj 目标对象
 * @param {String[]} keys 指定的对象属性
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */

export function pick(obj, keys) {
    return keys.reduce(
        (acc, cur) => (isValid(obj[cur]) && (acc[cur] = obj[cur]), acc),
        {}
    )
}
```

## omit: 忽略属性，返回新对象

浅拷贝

```js
/**
 * 返回忽略属性后的对象, 不改变源对象
 * 参考 lodash : https://lodash.com/docs/4.17.15#omit
 * @param {Object} obj 目标对象
 * @param {String[]} keys 要忽略的对象属性
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */

export function omit(obj, keys) {
    return keys.reduce((acc, cur) => (delete acc[cur], acc), { ...obj })
}
```
