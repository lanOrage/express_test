const mongoose = require('mongoose')
78/*2. 定义出对应特定集合的Model并向外暴露*/
// 2.1. 字义Schema(描述文档结构)
const recordSchema = mongoose.Schema({
    date: {type: String, required: true}, // 消费日期
    goods: {type: String, required: true}, // 消费商品
    price: {type: String, required: true}, // 消费金额
  })
  // 2.2. 定义Model(与集合对应, 可以操作集合)
  const RecordModel = mongoose.model('myrecord', recordSchema)
  // 2.3. 向外暴露Model
  exports.RecordModel = RecordModel