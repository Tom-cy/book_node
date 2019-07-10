var mongodb = require('mongodb')

var MongoClient = mongodb.MongoClient

var urlStr = 'mongodb://127.0.0.1:27017/';

function connect(callback) {
  MongoClient.connect(urlStr, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) {
      callback(err)
      return
    }
    callback(null, client)
  })
}


module.exports = connect