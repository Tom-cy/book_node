const express = require('express')
const router = express.Router()
let formidable = require('formidable')

router.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', '*')
  res.header(
    'Access-Control-Allow-Header',
    'Content-Type,Access-Token',
    'Content-Type,Content-Length,Authorization,Accept,X-Requested-With'
  )
  res.header('Access-Control-Expose-Headers', '*')
  res.header('X-powered-By', '3.2.1')

  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
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
// ---------------------------------------------------------------------------------------------------------------------------------------------
// 后台 登录Login
const Adminlogin = require('./admin/login')
router.get('/admin/login', Adminlogin)

// 后台 数据
const AdminData = require('./admin/getData')
router.get('/admin/AllData', AdminData)
// 后台 地址信息
const AdminAdress = require('./admin/getAdress')
router.get('/admin/getAdress', AdminAdress)

// // 修改地址数据
const changeAdress = require('./admin/changeAdress')
router.post('/admin/changeAdress', changeAdress)


module.exports = router
