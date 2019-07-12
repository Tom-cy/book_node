const connect = require('../db')

module.exports = (req, res) => {

  connect((err, client) => {
    if (err) {
      res.send({
        error: 1,
        data: "连接数据库失败"
      })
      return
    }

    let db = client.db("book")
    // 创建一个集合
    let Adress = db.collection('Adress')
    // 得到传递过来的数据
    let AdressData = req.query


    let findAdress = new Promise((resolve, reject) => {
      Adress.find({
        userName: AdressData.userName,
        phoneNumber: AdressData.phoneNumber
      }).toArray(function (err, result) {
        if (err) {
          res.send({
            error: 2,
            data: 链接集合失败
          })
        }
        console.log(result)
        if (!result.length) {
          reject([null, result])
          return
        }
        resolve(result)
        return
      })
    })
    // 第二次执行resolve状态----res为成功时的res
    findAdress.then(respone => {
      Adress.insertOne(respone, function (err, res) {
        if (err) {
          res.send({
            error: 3,
            data: "插入集合失败"
          })
        }
        res.send({
          error: 0,
          data: "加入数据库成功"
        })
      })
      // catch执行状态为reject
    }).catch(respone => {
      Adress.insertOne(AdressData, function (err, result) {
        if (err) {
          res.send({
            error: 4,
            data: "插入集合失败"
          })
        }
        res.send({
          error: 0,
          data: "加入数据库成功"
        })
      })
    })
  })
}