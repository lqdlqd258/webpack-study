let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'development',
    //多入口，用对象
    entry:{ 
         home:'./src/index.js',
         other:'./src/other.js'
    },
    output:{
        //[name] 指home,other 多出口
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html',//指定模板
            filename:'home.html',    //生成模板的名称
            chunks:['home']
        }),
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'other.html',
            chunks:['other','home']
        })
    ]
}