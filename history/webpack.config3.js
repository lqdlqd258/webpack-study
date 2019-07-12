let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    //多入口，用对象
    mode:'production',
    devServer:{
        progress: true,
        // open: true,
        port: 8000
    },
    entry:{ 
         index:'./src/index.js'
    },
    output:{
        //[name] 指home,other 多出口
        filename:'[name].js',
        path:path.join(__dirname,'dist')
    },
    // watch:true,
    // watchOptions:{  //监控的选项
    //     poll:1000,//每秒 监控（问我） 1次
    //     aggregateTimeout: 500,//防抖 我一直输入代码 停下0.5s后打包
    //     ignored:/node_modules/ //需要忽略监控的 文件
    // },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html',//指定模板
            filename:'index.html',    //生成模板的名称
            chunks:['index']
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin([
            {
                from:'./data',to:'./'
            }
        ]),
        new webpack.BannerPlugin('make 2019 by ljc')
    ]
}