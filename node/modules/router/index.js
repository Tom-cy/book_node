const express = require('express')
const router = express.Router()
let formidable = require('formidable')

router.use('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*') //这个表示任意域名都可以访问，这样写不能携带cookie了。
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, token, username, usertoken'
  )
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS') //设置方法
  if (req.method == 'OPTIONS') {
    res.sendStatus(200) // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
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

// FLM 平台管理中心 数据
const getFLMPtai = require('./getFLMPtai')
router.get('/getFLMPtai', getFLMPtai)

// 房乐美数据
const getFLM = require('./getFLM')
router.get('/getFLM', getFLM)

// ---------------------------------------------------------------------------------------------------------------------------------------------
// 后台 登录Login
// const Adminlogin = require('./admin/login')
// router.get('/admin/login', Adminlogin)

// 后台 数据
const AdminData = require('./admin/getData')
router.get('/admin/AllData', AdminData)
// 后台 地址信息
const AdminAdress = require('./admin/getAdress')
router.get('/admin/getAdress', AdminAdress)

// // 修改地址数据
// const changeAdress = require('./admin/changeAdress')
// router.post('/admin/changeAdress', changeAdress)
// 后台 订单信息
const getcheckOrder = require('./admin/getcheckOrder')
router.get('/admin/getcheckOrder', getcheckOrder)

//  
const getUserlist = require('./admin/getUserlist')
router.get('/admin/getUserlist', getUserlist)

// 后台面试数据
const getMsData = require('./admin/getMsData')
router.get('/admin/getMsData', getMsData)


// 房乐美数据
const getAdminFLM = require('./admin/getFLM')
router.get('/admin/getFLM', getAdminFLM)


// 后台获取登录用户信息
const getInfoData = require('./admin/getInfo')
router.get('/admin/getInfo', getInfoData)





module.exports = router
