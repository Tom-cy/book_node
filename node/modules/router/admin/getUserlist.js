const connect = require('../../db')

module.exports = (req, res) => {
  connect((err, client) => {
    if (err) {
      res.send({
        error: 1,
        data: '连接数据库失败'
      })
    }
    let db = client.db('book')
    let User = db.collection('user')

    let GetUser = new Promise((resovle, reject) => {
      User.find().toArray((err, result) => {
        if (err) {
          res.send({
            error: 2,
            data: '查询集合失败'
          })
        }
        res.send({
          error:0,
          message:"用户数据",
          data:result
        })
      })
    })
  })
}
