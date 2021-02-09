// 调用百度搜索建议接口
const axios = require('axios')
const express = require('express')
const app = express()
const port = 3000

app.get('/sugrec', async (req, res) => {
    const result = await axios.get(
        'https://www.baidu.com/sugrec?json=1&sid=33423_33518_33580_33344_31254_33594_33339_26350_33268'
    )
    console.log(result.data)
    res.send(result.data)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
