// const connect = require('../../db')

module.exports = (req, res) => {
  // connect((err, client) => {
  //   if (err) {
  //     res.send({
  //       error: 1,
  //       data: '连接数据库失败'
  //     })
  //   }
  // })
  const users = {
    admin: {
      roles: ['admin'],
      introduction: '我是超级管理员',
      avatar: 'https://www.965icu.com/dist/img/1.e89745af.gif',
      name: 'Super Admin'
    },
    editor: {
      roles: ['editor'],
      introduction: '我是打工仔',
      avatar: 'https://www.965icu.com/dist/img/1.e89745af.gif',
      name: 'Normal Editor'
    }
  }
  const { username } = req.query
  const info = users[username]
  if (!info) {
    res.send({
      error: 2,
      data: '普通用户，无权限'
    })
  } else {
    res.send({
      error: 0,
      msg: '有权限用户',
      data: info
    })
  }
}
