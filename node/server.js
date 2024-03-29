const express = require('express')
const app = new express()
const router = require('./modules/router')
const bodyParser = require('body-parser')
// 开启gzip 压缩，如果关闭，注释下面两行代码
const compression = require('compression')
app.use(compression())
// const cors = require("cors")

// app.use(cors)
// 创建 application/x-www-form-urlencoded 编码解析
app.use(router)
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
//parse application/json
app.use(bodyParser.json())

// // 检查数据
const checkOrder = require('./modules/router/checkOrder')
app.post('/checkOrder', checkOrder)
// // // // 修改地址数据
const changeAdress = require('./modules/router/admin/changeAdress')
app.post('/admin/changeAdress', changeAdress)

const Login = require('./modules/router/admin/login')
app.post('/admin/login', Login)

const MSData = require('./modules/router/admin/getMsData')
app.post('/admin/getMsData', MSData)


const FLMhouse = require('./modules/router/admin/getFLMhouse')
app.post('/admin/getFLMhouse', FLMhouse)


const FLMUserPeo = require('./modules/router/admin/getFLMUserPeo')
app.post('/admin/getFLMUserPeo', FLMUserPeo)







app.listen(9562, () => {
  console.log('9562 Start')
})
