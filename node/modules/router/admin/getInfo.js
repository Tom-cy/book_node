/**
 * 只有用户名为admin 才是权限用户  权限admin
 * editor 为普通用户              权限editor
 */
module.exports = (req, res) => {

  const users = {
    admin: {
      roles: ['admin'],
      introduction: '我是超级管理员',
      avatar: 'https://www.965icu.com/dist/img/1.e89745af.gif',
      name: 'Super Admin'
    }
  }
  const editor = {
    roles: ['editor'],
    introduction: '我是打工仔',
    avatar: 'https://www.965icu.com/dist/img/1.e89745af.gif',
    name: 'Normal Editor'
  }


  const {
    username
  } = req.query


  const info = users[username]


  if (!info) {
    res.send({
      error: 2,
      message: '普通用户，无权限',
      data: editor
    })
  } else {
    res.send({
      error: 0,
      msg: "有权限用户",
      data: info
    });
  }
}
