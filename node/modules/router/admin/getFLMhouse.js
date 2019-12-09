const connect = require('../../db');

module.exports = (req, res) => {
  connect((err, client) => {
    if (err) {
      res.send({
        error: 1,
        data: '连接数据库失败'
      });
    }

    let db = client.db('book');
    let FLMhouse = db.collection('FLMhouse');

    FLMhouse.find().toArray((err, result) => {
      result.map((item, index) => {
        if (index % 2) {
          item.houserZhuangTai = true;
        } else {
          item.houserZhuangTai = false;
        }

        if (!item.houserAdress) {
          item.houserAdress =
            '南昌市青云谱区博学路与博览路交叉口东南' + (index + 100) + '米';
        }

        if (!item.houserId) {
          item.houserId = '地字第5101834455463' + index + '号';
        }
      });
      console.log(result);

      if (err) {
        res.send({
          error: 2,
          data: '连接集合失败'
        });
      }
      // let resultarr = result.map(item => {
      //   item.allData = JSON.parse(item.allData)
      // })
      // 对象中的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中：扩展运算符(…)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中
      // let resultarr = result.map(item => {
      //   let temp = JSON.parse(item.allData)
      //   return {
      //     ...temp,
      //     address: temp.adressAddres + temp.adressAdtail
      //   }
      // })
      res.send({
        error: 0,
        message: '数据',
        data: result
      });
    });
  });
};
