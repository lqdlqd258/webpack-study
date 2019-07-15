let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
// 模块 happypack 实现多线程打包
const HappyPack = require('happypack');


module.exports = {
    mode:'development',
    entry:{
        index:'./src/index.js'
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
                use:'HappyPack/loader?id=js',
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use:'HappyPack/loader?id=css',
                exclude:/node_modules/
            }
        ]
    },
    output:{
        filename:'index.js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
        new HappyPack({
            id:'js',
            use:[{
                loader:'babel-loader',
                options:{
                    presets:['@babel/preset-env','@babel/preset-react']
             
                }
            }]
        }),
        new HappyPack({
            id:'css',
            use:['style-loader','css-loader']
        }),
        //引用动态链接库
        new webpack.DllReferencePlugin({
            manifest:path.resolve(__dirname,'dist','manifest.json')
        }),

        new webpack.IgnorePlugin(/\.\/locale/,/moment/),
        new htmlWebpackPlugin({
            template:'./public/index.html',
            filename:'index.html',
            chunks:['index']
        })
    ]
}