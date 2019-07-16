let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
// 模块 happypack 实现多线程打包

module.exports = {
    mode:'production',
    entry:{
        index:'./src/index.js'
    },
    devServer:{
        hot:true,
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
                        presets:['@babel/preset-env','@babel/preset-react'],
                        plugins:['@babel/plugin-syntax-dynamic-import']
                        
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
        new webpack.NamedModulesPlugin(),//打印更新的模块路径
        new webpack.HotModuleReplacementPlugin(),//热更新插件
        new htmlWebpackPlugin({
            template:'./public/index.html',
            filename:'index.html',
            chunks:['index']
        })
    ]
}