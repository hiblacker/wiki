# ES6

## Map

`Map` 对象是键值对集合。有以下特性：

-   任何值都可以作为键。
-   键不可重复，独一无二，重复设置会覆盖前值。
-   键是有序的。迭代的时候 `Map` 对象以插入的顺序返回键值。

### `Object` 和 `Map` 的比较

7 大不同

|              | Map                                | Object                                                            |
| ------------ | ---------------------------------- | ----------------------------------------------------------------- |
| 额外的键     | 默认无。只包含插入的键             | 存在原型链，可能会与自定义键冲突                                  |
| 键的类型     | 任意类型                           | 只能是 `String` 或 `Symbol`                                       |
| 键的顺序     | 有序                               | 目前是有序的，但不可靠                                            |
| Size         | 键值个数可通过 `size` 属性轻易获取 | 需要手动计算                                                      |
| 迭代         | 可迭代                             | 本身不可迭代。可通过 Object.keys、Object.entries 或`for...in`迭代 |
| 性能         | 频繁增删场景下表现更好             | 未做优化                                                          |
| 序列化和解析 | 不支持                             | 支持 （`JSON.stringify`、`JSON.parse`）                           |

### 对象方法

-   [Map.prototype\[@@iterator\]()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/@@iterator)
-   [Map.prototype.clear()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/clear)
-   [Map.prototype.delete()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/delete)
-   [Map.prototype.entries()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/entries)
-   [Map.prototype.forEach()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach)
-   [Map.prototype.get()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/get)
-   [Map.prototype.has()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/has)
-   [Map.prototype.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/keys)
-   [Map.prototype.set()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/set)
-   [Map.prototype.values()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/values)

## WeakMap

`WeakMap` 对象是一组键/值对的集合，其中的键是弱引用的。其**键必须是对象**，而值可以是任意的。

与 `Map` 区别
- `WeakMap` 键只能是对象。
- `WeakMap` 不可被遍历。
- `WeakMap` 键是弱引用，键所指向的对象可被垃圾回收机制回收。

**注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。**

`Map`, 有以下两大缺点：

-   `Map` 赋值和搜索的时间复杂度都为 O(n)，因为这两个操作都需要遍历整个数组来进行匹配。
-   `Map` 可能会导致内存泄漏，因为数组会一直引用着每个键和值。这种引用使得垃圾回收算法不能回收处理他们，即使没有其他任何引用存在了。

相比之下，原生的 `WeakMap` 持有的是每个键对象的“弱引用”，这意味着在没有其他引用存在时垃圾回收能正确进行。


### 对象方法

- [WeakMap.prototype.delete()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/delete)
- [WeakMap.prototype.get()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/get)
- [WeakMap.prototype.has()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/has)
- [WeakMap.prototype.set()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/set)
