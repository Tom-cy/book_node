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
        data: '连接数据库失败'
      })
      return
    }

    let db = client.db('book')
    // 创建一个集合
    let FLMHOSE = db.collection('FLMhouse')
    // 得到传递过来的数据
    console.log(req.query);
    
    let mSdata = JSON.parse(req.query.msData)
    mSdata.Nowdata = new Date().Format('yyyy-MM-dd')
    let findMS = new Promise((resolve, reject) => {
      FLMHOSE.find({
        userName: req.query.userName,
        phoneNumber: req.query.phoneNumber
      }).toArray(function(err, result) {
        if (err) {
          res.send({
            error: 2,
            data: 链接集合失败
          })
        }
        if (!result.length) {
          reject([null, result])
          return
        }
        resolve(result)
        return
      })
    })
    // 第二次执行resolve状态----res为成功时的res
    findMS
      .then(respone => {
        FLMHOSE.insertOne(respone, function(err, res) {
          if (err) {
            res.send({
              error: 3,
              data: '插入集合失败'
            })
          }
          res.send({
            error: 0,
            data: '加入数据库成功'
          })
        })
        // catch执行状态为reject
      })
      .catch(respone => {
        FLMHOSE.insertOne(mSdata, function(err, result) {
          if (err) {
            res.send({
              error: 4,
              data: '插入集合失败'
            })
          }
          res.send({
            error: 0,
            data: '加入数据库成功'
          })
        })
      })
  })
}
