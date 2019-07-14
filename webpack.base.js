let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    //多入口，用对象
    devServer:{
        progress: true,
        // open: true,
        port: 8000,
        //第一种
        // proxy:{ //1.重写方式  把请求代理到express服务器上
        //     '/api':{
        //         target:'http://localhost:3000',
        //         pathRewrite:{'/api':''}
        //     } //配置了一个代理
        // }
        //第二种 模拟数据
        // before(app){
        //     app.get('/user',(req,res)=>{
        //         res.json({name:'ljc',age:'24',myLove:'tucao'});
        //     });
        // }
        //第三种 前端有自己的服务端，在服务端启动webpack，端口用服务端端口（需要一个中间件），直接改造服务端
        
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
    // resolve:{
    //     //指定解析 第三方包 的路径 （可以拼接多个指定路径）
    //     modules:[path.join('node_modules')],
    //     //引入 某些模块（如css，js等文件）或者第三方包 后缀名省略 找对应后缀名文件
    //     //优先级默认从左向右
    //     extensions:['.js','.css','.json','.vue'],
    //     //主入口 字段   一般解析第三方包 都会寻找package.json 中的main字段 对应的 路径
    //     //优先级默认从左向右
    //     mainFields:['style','main'],
    //     //入口文件名字 默认 index.js
    //     mainFiles:[],
    //     //别名
    //     alias:{
    //         bootstrap:'bootstrap/dist/css/bootstrap.css'
    //     }
    // },
    resolve:{
        extensions:['.js','.css','.json','.vue']
    },
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
         //配置默认变量
        new webpack.DefinePlugin({
            DEV:JSON.stringify('dev'),
            FlAG:'true'
        }),
        // new CopyPlugin(
        //     [
        //         {
        //             from:'./data',to:'./'
        //         }
        //     ]
        // ),
        // new webpack.BannerPlugin('make 2019 by ljc')
    ]
}