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
    let Adress = db.collection("Adress")
    // 得到传递过来的数据
    let AdressUse = req.query
    AdressData = JSON.parse(AdressUse.data)
    let id
    AdressData.filter(v => {
      id = v.addressId
    })
    let whereStr = {
      addressId: id
    }
    let findAdress = new Promise((resolve, reject) => {
      Adress.deleteMany(whereStr, (err, obj) => {
        if (err) {
          res.send({
            error: 2,
            data: "连接集合失败"
          })
          return
        }
        res.send({
          error: 0,
          data: "删除数据成功"
        })
      })
    })










  })
}