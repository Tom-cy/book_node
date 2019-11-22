const connect = require('../db')
Date.prototype.Format = function(fmt) {
  //author: meizz
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    S: this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}

module.exports = (req, res) => {
  connect((err, client) => {
    if (err) {
      res.send({
        error: 1,
        data: '链接数据库失败'
      })
      return
    }
    let db = client.db('book')
    let user = db.collection('user')

    let nowTime = new Date().Format('yyyy-MM-dd hh:mm:ss')
    let nowDate = new Date()
    let day = nowDate.getDate()
    let month = nowDate.getMonth() + 1
    let year = nowDate.getFullYear()

    let findUser = new Promise((resolve, reject) => {
      user.findOne(
        {
          phoneNumber: req.query.phoneNumber
        },
        (err, result) => {
          if (err) {
            res.send({
              error: 2,
              data: '查找用户失败'
            })
            return
          }
          if (result) {
            resolve(result)
          } else {
            reject(req.query)
          }
        }
      )
    })

    findUser
      .then(result => {
        if (result.password === req.query.password) {
          result.lastLoginDate = nowTime
          res.send({
            error: 0,
            userInfo: result,
            data: '登录成功'
          })
          return
        } else {
          res.send({
            error: 3,
            data: '密码错误'
          })
          return
        }
      })
      .catch(userInfo => {
        let fullUserInfo = {
          userName: userInfo.phoneNumber,
          phoneNumber: userInfo.phoneNumber,
          role: 'A',
          password: userInfo.password,
          registerDate: nowTime,
          lastLoginDate: nowTime,
          totalPrice: 0,
          registerDay: day < 10 ? '-' + day : day,
          registerMonth: month,
          registerYear: year,
          addressList: []
        }
        // 插入一条数据条数据 insertOne()
        user.insertOne(fullUserInfo, (err, result) => {
          if (!err) {
            res.send({
              error: 0,
              userInfo: fullUserInfo,
              data: '注册成功'
            })
            return
          }
        })
      })
  })
}
