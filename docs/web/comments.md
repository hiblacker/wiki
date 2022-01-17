# 如何为函数写注释

参考的[JSDoc](https://www.html.cn/doc/jsdoc/tags-param.html)

## @param

描述: 记录传递给一个函数的参数。 别名:

-   arg
-   argument

### 概述

`@param`标签提供了对某个函数的参数的各项说明，包括参数名、参数数据类型、描述等。

参数类型可以是一个内置的 JavaScript 类型，如`string`或`Object`。

### 例子

#### 名称, 类型, 和说明

下面的示例演示如何在 `@param`标签中包含名称，类型，和说明。

注释变量名 、 变量类型 和 变量说明 ,例如：

```js
/**
 * @param {string} somebody Somebody's name.
 */
function sayHello(somebody) {
    alert('Hello ' + somebody)
}
```

你可以在变量说明前加个连字符，使之更加容易阅读， 例如：

```js
/**
 * @param {string} somebody - Somebody's name.
 */
function sayHello(somebody) {
    alert('Hello ' + somebody)
}
```

#### 变量是一个对象，带属性

```js
/**
 * Assign the project to an employee.
 * @param {Object} employee - The employee who is responsible for the project.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.department - The employee's department.
 */
 Project.prototype.assign = function(employee) {    // ...};
```

#### 变量是一个数组

```js
/**
 * Assign the project to a list of employees.
 * @param {Object[]} employees - The employees who are responsible for the project.
 * @param {string} employees[].name - The name of an employee.
 * @param {string} employees[].department - The employee's department.
 */Project.prototype.assign = function(employees) {    // ...};
```

#### 一个可选参数和默认值：

-   可选参数用`[]`表示
-   默认值用 `=`表示

```js
/**
 * @param {string} [somebody=John Doe] - Somebody's name.
 */
function sayHello(somebody) {
    if (!somebody) {
        somebody = 'John Doe'
    }
    alert('Hello ' + somebody)
}
```

#### 多种类型

```js
/**
 * @param {(string|string[])} [somebody=John Doe] - Somebody's name, or an array of names.
 */
function sayHello(somebody) {
    if (!somebody) {
        somebody = 'John Doe'
    } else if (Array.isArray(somebody)) {
        somebody = somebody.join(', ')
    }
    alert('Hello ' + somebody)
}
```

#### 任何类型

```js
/**
 * @param {*} somebody - Whatever you want.
 */
function sayHello(somebody) {
    console.log('Hello ' + JSON.stringify(somebody))
}
```

#### 可重复使用的参数

```js
/**
 * Returns the sum of all numbers passed to the function.
 * @param {...number} num - A positive or negative number.
 */
 function sum(num) {
     var i = 0, n = arguments.length, t = 0;
     for (; i &lt; n; i++) {
        t += arguments[i];
    }
    return t;
}
```

#### 回调函数

如果参数接受一个回调函数，您可以使用@callback 标签来定义一个回调类型，然后回调类型包含到@param 标签中。

```js
/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback requestCallback
 * @param {number} responseCode
 * @param {string} responseMessage
 */
/**
 * Does something asynchronously and executes the callback on completion.
 * @param {requestCallback} cb - The callback that handles the response.
 */
function doSomethingAsynchronously(cb) {
    // code
}
```
