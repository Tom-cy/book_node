const connect = require('../../db')
const Jwt = require('../../tools/jwt')
module.exports = (req, res) => {
  let adminUserData = JSON.parse(req.query.parse)
  let { username, password } = adminUserData
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
          resolve(result)
        } else {
          reject(req.query)
        }
      })
    })

    findAdminUser
      .then(respone => {
        if (respone.password === adminUserData.password) {
          // 登陆成功，添加token验证
          let id = respone._id.toString()
          let jwt = new Jwt(id)
          
          console.log(jwt)
          let token = jwt.generateToken()

          // console.log(token)

          res.send({
            error: 0,
            data: '登录成功'
          })
        } else {
          res.send({
            error: 1,
            data: '密码错误'
          })
        }
      })
      .catch(respone => {
        adminUsers.insertOne(adminUserData, (err, res) => {
          if (err) {
            res.send({
              error: 4,
              data: '插入用户失败'
            })
            return
          }
        })
      })
  })
}
