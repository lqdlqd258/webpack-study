let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
// 模块 happypack 实现多线程打包
const HappyPack = require('happypack');


module.exports = {
    mode:'production',
    optimization:{  //优化
        splitChunks:{   //分割代码块
            cacheGroups:{   //缓存组
                common:{    //公共的模块
                    chunks:'initial',
                    minSize:0,//代码大小 大于 0 个字节抽离
                    minChunks:2//当前代码引用 2次 抽离
                },
                vender:{
                    priority:1,
                    test:/node_modules/,
                    chunks:'initial',
                    minSize:0,
                    minChunks:2
                }
            }
        }
    },
    entry:{
        index:'./src/index.js',
        other:'./src/other.js'
    },
    devServer:{
        port:3000,
        // open:true,
        contentBase:'./dist',//为了保险，找不到dist文件夹，就找内存中的
    },
    module:{
        noParse:/jquery/,//不去解析 jquery 中的依赖库
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env','@babel/preset-react']
                 
                    }
                },
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
     
        //引用动态链接库
        // new webpack.DllReferencePlugin({
        //     manifest:path.resolve(__dirname,'dist','manifest.json')
        // }),

        new webpack.IgnorePlugin(/\.\/locale/,/moment/),
        new htmlWebpackPlugin({
            template:'./public/index.html',
            filename:'index.html',
            chunks:['index']
        })
    ]
}