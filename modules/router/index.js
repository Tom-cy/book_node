const express = require('express')
const router = express.Router()
let formidable = require('formidable')

router.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Header", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-powered-By", "3.2.1");

  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }


})

// 引入文件

//小程序 login页
const login = require('./login')
router.get('/login', login)
// 添加商品页
const addshopCar = require('./addshopCar')
router.get('/addshopCar', addshopCar)
// 购物车页
const getShopcarList = require('./getShopcarList')
router.get('/getShopcarList', getShopcarList)
// 添加地址数据
const addAdress = require('./addAdress')
router.get('/addAdress', addAdress)
// 获取地址数据
const getAdress = require('./getAdress')
router.get('/getAdress', getAdress)
// 删除地址数据
const deleteAdress = require('./deleteAdress')
router.get('/deleteAdress', deleteAdress)

// 查询订单
const getOrderList = require('./getOrderList')
router.get('/getOrderList', getOrderList)

// 后台 首页
const AllData = require('./admin/getData')
router.get('/admin/AllData', AllData)


module.exports = router