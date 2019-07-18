const connect = require('../../db')

module.exports = (req, res) => {
  connect((err, client) => {
    if (err) {
      res.send({
        error: 0,
        data: '连接数据库失败'
      })
    }

    let db = client.db('book')
    let user = db.collection('user')
    let order = db.collection('checkOrder')

    function findUser() {
      return new Promise((resolve, reject) => {
        user.find().toArray((err, arr) => {
          resolve({
            type: 'user',
            data: arr
          })
        })
      })
    }

    function findOrder() {
      return new Promise((resolve, reject) => {
        order.find().toArray((err, arr) => {
          resolve({
            type: 'order',
            data: arr
          })
        })
      })
    }

    let findRes = findUser()
    let findOrderRes = findOrder()
    let findAll = Promise.all([findRes, findOrderRes])

    findAll
      .then(arr => {
        res.send(arr)
      })
      .catch(() => {
        res.send({
          error: 'error',
          data: '出错了'
        })
      })
  })
}
