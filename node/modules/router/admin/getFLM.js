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
    let AdminFLM = db.collection('MSFLM')

    AdminFLM.find().toArray((err, result) => {
      if (err) {
        res.send({
          error: 2,
          data: '连接集合失败'
        })
      }
      res.send({
        error: 0,
        message: '数据',
        data: result
      })
    })
  })
}
