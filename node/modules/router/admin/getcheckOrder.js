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
    let checkOrder = db.collection('checkOrder')
    // 查询所需的数据
    // let Where = {
    //   owner: Str.userInfo
    // }

    let getOrder = new Promise((resolve, reject) => {
      checkOrder.find().toArray((err, client) => {
        if (err) {
          reject(err)
          return
        }
        res.send({
          error: 0,
          data: client
        })
      })
    })
  })
}
