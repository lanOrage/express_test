/*1. 连接数据库*/
// 1.1. 引入mongoose
const mongoose = require('mongoose')
// 引入express
const express=require('express')
const cookieParser = require('cookie-parser');
const {RecordModel} = require('./models/models')

// 创建一个后台应用对象
const app=express()

// 1.2. 连接指定数据库(URL只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/records').then(
    ()=>{
        console.log("连接成功");
        // // 启动服务器，监听在指定的端口上
        app.listen('4000',()=>{
        console.log('启动服务器咯~服务器在4000上启动，请访问：http://localhost:4000')
        })
    },
    error=>{
        console.log("连接失败")
    }
)

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const filter = { __v: 0} // 指定过滤的属性

// 注册一个post路由
app.post('/', function (req, res) {
    // 读取请求参数数据
    const {date, goods, price} = req.body
    // 保存
   new RecordModel({date, goods, price}).save(function (error, record) {
    // // 生成一个cookie(recordid: record._id), 并交给浏览器保存
    // res.cookie('recordid', record._id, {maxAge: 1000*60*60*24})
    // 返回包含user的json数据
    const data = {date, goods, price}
    res.send({code: 0, data})
  })
    // 返回响应数据
  })


// 获取消费记录（根据cookie中的recordid
app.get('/get_record', function (req, res) {
  // 根据userid查询对应的user
  RecordModel.find({}, filter, function (error, record) {
    if(record) {
      res.send({code: 0, data: record})
    }
  })
})


module.exports = app;

// 下载：
// npm i express --save    安装express  并添加到依赖项