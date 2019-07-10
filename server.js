const express = require('express')
const app = new express()


const router = require('./modules/router')
const bodyParser = require('body-parser')

app.use(router)
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({
  extended: false
}))
app.listen(9562, () => {
  console.log('9562 Start')
})