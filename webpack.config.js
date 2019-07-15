let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
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
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env','@babel/preset-react']
                    }
                },
                exclude:/node_modules/
            }
        ]
    },
    output:{
        filename:'index.js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
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