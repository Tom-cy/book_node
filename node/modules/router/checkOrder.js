const connect = require('../db')

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

  let checkOrderList = req.body
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

    let nowDate = new Date()
    let nowTime = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
    let day = nowDate.getDate()
    let month = nowDate.getMonth() + 1
    let year = nowDate.getFullYear()
    let orderInfo = {
      // 订单人
      owner: checkOrderList.userName,
      // 订单信息
      orderlist: checkOrderList.shopCarList,
      // 订单时间
      orderTime: nowTime,
      // 订单时间戳
      timeStamp: checkOrderList.timeStamp,
      // 订单地址信息
      orderAdres: checkOrderList.adressdata,
      // 订单总数
      orderAllnum: checkOrderList.shopCarNum,
      // 订单日期
      orderDay: day < 10 ? "0" + day : day,
      // 订单年
      orderYear: year,
      // 订单月份
      orderMonth: month,
      // 订单状态
      orderStatis: checkOrderList.status,
      // 订单总金额
      orderMoney: checkOrderList.shopCarPrice
    }

    let check = new Promise((resolve, reject) => {
      checkOrder.insertOne(orderInfo, (err, res) => {
        if (err) {
          if (err) {
            reject(err)
          }
          return
        }
        resolve()
      })
    })

    check.then((respone) => {
      checkOrder.find({
        owner: checkOrderList.userName,
      }).toArray((err, arr) => {
        if (err) {
          res.send({
            error: 2,
            data: "查询订单失败"
          })
          return
        }
        res.send({
          error: 0,
          data: arr
        })
      })

    }).catch((res) => {
      res.send({
        error: 3,
        data: "查询失败"
      })
    })


  })
}