const connect = require('../../db')
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


module.exports = (req, res) => {

  let adminUserData = JSON.parse(req.query.parse)
  connect((err, client) => {
    if (err) {
      res.send({
        error: 1,
        data: '链接数据库失败'
      })
      return
    }

    let db = client.db("book")
    let adminUser = db.collection("adminUser")

    let findadminUser = new Promise((resolve, reject) => {

    })

  })
}