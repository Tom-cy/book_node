const connect = require('../db')
module.exports = (req, res) => {
  connect((err, client) => {
    if (err) {
      res.send({
        error: 1,
        data: '连接数据库失败'
      })
      return
    }
    // 连接数据库
    let db = client.db('book')
    // 创建一个商品集合-购物车
    let shopCar = db.collection('shopCar')
    // 获取到的数据
    let shopCarData = JSON.parse(req.query.bookDeta)
    // 第一次执行查询数据
    let findShop = new Promise((resolve, reject) => {
      shopCar.find({
        owner: shopCarData.owner
      }).toArray((err, arr) => {
        // 如果报错提升报错
        if (err) {
          reject(err)
        }
        // 如果数据不为空,reject
        if (arr.length) {
          reject([null, arr])
          return
        }
        // 否则成功返回arr
        // 数据为空时执行resolve 
        resolve(arr)
      })
      return
    })
    // 第二次执行插入数据
    findShop.then(shopCarData => {
      shopCar.insertOne(shopCarData, function (err, res) {
        if (err) {
          res.send({
            error: 2,
            data: "加入购物车失败"
          })
        }
        res.send({
          error: 0,
          data: "加入购物车成功"
        })
        return
      })
    }).catch(respone => {
      if (respone[0]) {
        res.send({
          error: 3,
          data: '加入购物车失败'
        })
        return
      }
      // 得到了数据----进行更新----数据第一次加入时可能为空，调用find 方法时会报错----
      if (respone[1]) {
        let respon = respone[1]
        let shop = respon.find((v, i) => {
          return v.itemName == shopCarData.itemName
        })
        if (shop) {
          // // // // 判断数据是否相同
          if (shop.mid === shopCarData.mid && shop.isbn === shopCarData.isbn) {
            //   // 数据相同数量自加
            shop.num = +shop.num + +shopCarData.num

            // let price = parseInt(shop.price)
            shop.price = +(shop.allprice) + parseInt(shopCarData.price)
            // // 查询条件
            var whereStr = {
              owner: shopCarData.owner
            }
            // // 更新设置
            var updateStr = {
              $set: {
                num: shop.num,
                allprice: shop.price
              }
            }
            // 判断数据是否重复，重复数据数量+1
            shopCar.updateOne(whereStr, updateStr, function (err, result) {
              if (err) {
                res.send({
                  error: 4,
                  data: "更新失败"
                })
                return
              }
              res.send({
                error: 0,
                data: "加入购物车成功"
              })
              return
            })
            return
          }
        }
      }
      // 插入数据----哦噢噢噢噢噢噢噢噢哦哦
      shopCar.insertOne(shopCarData, function (err, result) {
        if (err) {
          res.send({
            error: 5,
            data: "加入购物车失败"
          })
        }
        res.send({
          error: 0,
          data: "加入购物车成功"
        })

      })

    })
  })

}