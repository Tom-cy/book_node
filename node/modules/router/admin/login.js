const connect = require('../../db')
const JwtUtil = require('../../tools/jwt.js')
module.exports = (req, res) => {
  let adminUserData = req.query
  let {
    username,
    password
  } = adminUserData
  connect((err, client) => {
    if (err) {
      res.send({
        error: 2,
        data: '连接数据库失败'
      })
    }
    let db = client.db('book')
    let adminUsers = db.collection('adminUsers')
    let Where = {
      username: username
    }
    let findAdminUser = new Promise((resolve, reject) => {
      adminUsers.findOne(Where, (err, result) => {
        console.log(result)
        if (err) {
          res.send({
            error: 3,
            data: '查找用户失败'
          })
          return
        }
        // 用户第一次来执行catch事件
        // 用户第二次来执行then 事件
        if (result) {
          console.log('执行1')
          resolve(result)
        } else {
          console.log('执行2')
          reject(req.query)
        }
      })
    })
    findAdminUser
      .then(respone => {
        console.log('执行3')
        console.log(respone)
        if (respone.password === adminUserData.password) {
          // 登陆成功，添加token验证
          let id = respone._id.toString()
          let jwts = new JwtUtil(id)
          let token = jwts.generateToken()
          res.send({
            error: 0,
            token: token,
            data: '登录成功'
          })
          return
        } else {
          res.send({
            error: 1,
            data: '密码错误'
          })
        }
      })
      .catch(respone => {
        console.log(respone)
        console.log('执行4')

        // 注册成功，添加token验证
        let id = respone._id.toString()
        let jwts = new JwtUtil(id)
        let token = jwts.generateToken()
        adminUsers.insertOne(adminUserData, (err, result) => {
          if (err) {
            res.send({
              error: 4,
              data: '插入用户失败'
            })
            return
          }
          res.send({
            error: 0,
            token: token,
            data: '注册成功'
          })
        })
      })
  })
}