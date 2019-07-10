const connect = require('../db')

module.exports = (req, res) => {
  connect((err, client) => {
    if (err) {
      res.send({
        error: 1,
        data: '连接数据库失败'
      })
    }

    let db = client.db('book')
    let getShopCar = db.collection("shopCar")
    let reqData = req.query
    getShopCar.find(reqData).toArray((err, result) => {
      if (err) {
        res.send({
          error: 2,
          data: '查询数据库失败'
        })
      }
      res.send({
        error: 0,
        data: result
      })
    })
  })
}