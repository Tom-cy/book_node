const express = require('express')
const app = new express()
const router = require('./modules/router')
const bodyParser = require('body-parser')
// const cors = require("cors")

// app.use(cors)
// 创建 application/x-www-form-urlencoded 编码解析
app.use(router)
app.use(bodyParser.urlencoded({
  extended: false
}))
//parse application/json
app.use(bodyParser.json())

// // 检查数据
const checkOrder = require('./modules/router/checkOrder')
app.post('/checkOrder', checkOrder)
// // // // 修改地址数据
const changeAdress = require('./modules/router/admin/changeAdress')
app.post('/admin/changeAdress', changeAdress)

app.listen(9562, () => {
  console.log('9562 Start')
})