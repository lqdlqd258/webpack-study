//express nodejs框架
let express = require('express');
let app = express();

//服务端改造
//引入webpack 等会拿到webpack配置
let webpack = require('webpack');
//中间件
let middleWare = require('webpack-dev-middleware');
//拿到配置对象
let config = require('./webpack.config.js');
//编译配置对象,保存webpack编译后的编译对象
let compiler = webpack(config);
//将保存的编译对象变量，传给中间件，并通过app.use使用中间件
app.use(middleWare(compiler));

app.get('/user',(req,res)=>{
    res.json({name:'ljc',age:'24'});
});
app.listen(3000);