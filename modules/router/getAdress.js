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
        res.send({
          error: 0,
          data: result
        })
      })
    })

  })
}