const connect = require('../../db')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')
const md5 = require('md5')
 
module.exports = async (ctx, next) => {
  let adminUserData = JSON.parse(ctx.query.parse)
  let { username, password } = adminUserData
  let sql =
      'SELECT uid FROM t_user WHERE name=? and password=? and is_delete=0',
    value = [name, md5(password)]

  connect((err, client) => {
    if (err) {
      res.send({
        error: 0,
        data: '连接数据库失败'
      })
    }

    let db = client.db('book')
  })
  //   await db
  //     .query(sql, value)
  //     .then(res => {
  //       if (res && res.length > 0) {
  //         let val = res[0]
  //         let uid = val['uid']
  //         let token = generateToken({ uid })
  //         ctx.body = {
  //           ...Tips[0],
  //           data: { token }
  //         }
  //       } else {
  //         ctx.body = Tips[1006]
  //       }
  //     })
  //     .catch(e => {
  //       ctx.body = Tips[1002]
  //     })
  // })
}
