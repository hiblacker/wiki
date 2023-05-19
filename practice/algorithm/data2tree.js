/**
 * 数据转树结构
 */
const arr = [
    {
        id: 2,
        name: '部门B',
        parentId: 0,
    },
    {
        id: 3,
        name: '部门C',
        parentId: 1,
    },
    {
        id: 1,
        name: '部门A',
        parentId: 2,
    },
    {
        id: 4,
        name: '部门D',
        parentId: 1,
    },
    {
        id: 5,
        name: '部门E',
        parentId: 2,
    },
    {
        id: 6,
        name: '部门F',
        parentId: 3,
    },
    {
        id: 7,
        name: '部门G',
        parentId: 2,
    },
    {
        id: 8,
        name: '部门H',
        parentId: 4,
    },
]

function transformTree(arr) {
    const cache = arr.reduce((acc, cur) => {
        acc[cur.id] = cur
        cur.children = []
        return acc
    }, {})
    const result = []
    arr.forEach(i => {
        const father = cache[i.parentId]
        if (father) {
            father.children.push(i)
        } else {
            result.push(i)
        }
    })
    return result
}
const res = transformTree(arr)
console.log(JSON.stringify(res, null, 2))

// 结果
const result = [
    {
        id: 2,
        name: '部门B',
        parentId: 0,
        children: [
            {
                id: 1,
                name: '部门A',
                parentId: 2,
                children: [
                    {
                        id: 3,
                        name: '部门C',
                        parentId: 1,
                        children: [
                            {
                                id: 6,
                                name: '部门F',
                                parentId: 3,
                                children: [],
                            },
                        ],
                    },
                    {
                        id: 4,
                        name: '部门D',
                        parentId: 1,
                        children: [
                            {
                                id: 8,
                                name: '部门H',
                                parentId: 4,
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                id: 5,
                name: '部门E',
                parentId: 2,
                children: [],
            },
            {
                id: 7,
                name: '部门G',
                parentId: 2,
                children: [],
            },
        ],
    },
]

// 去重
const unique = (arr, k) => arr.reduce((acc, cur) => acc.find(i => i[k] == cur[k]) ? acc : acc.concat([cur]),[])

console.log(
    JSON.stringify(
        unique(
            [
                { a: 1, b: 2 },
                { a: 1, b: 2 },
                { a: 2, b: 2 },
            ],
            'a'
        ),
        null,
        2
    )
)
