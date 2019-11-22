const connect = require('../../db')

module.exports = (req, res) => {
  const data = JSON.parse(req.body.data)
  const addressId = {
    addressId: data.addressId
  }
  // 修改用户地址
  connect((err, client) => {
    if (err) {
      res.send({
        error: 1,
        data: '连接数据库失败'
      })
    }
    const db = client.db('book')
    const Adress = db.collection('Adress')
    const Where = {
      userName: data.userName
    }

    const changeAdress = new Promise((resolve, reject) => {
      Adress.find(Where).toArray((err, result) => {
        if (err) {
          res.send({
            error: 2,
            data: '连接集合失败'
          })
          return
        }
        // result.map(item => {
        //   const temp = JSON.parse(item.allData)
        //   return {
        //     ...temp
        //   }
        // })
        resolve(result)
      })
    })
    changeAdress.then(response => {
      var updateStr = {
        $set: data
      }
      Adress.updateMany(addressId, updateStr, (err, result) => {
        if (err) {
          res.send({
            error: 3,
            data: '更新失败'
          })
          return
        }
        res.send({
          error:0,
          data:"更新成功"
        })
      })
    })
  })
}
