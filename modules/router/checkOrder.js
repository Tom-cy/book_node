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
    let checkOrder = db.collection("checkOrder")



    console.log(req)
    console.log(res)








  })
}