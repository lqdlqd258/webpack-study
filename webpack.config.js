let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'development',
    entry:{
        index:'./src/index.js'
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
                }
            }
        ]
    },
    output:{
        filename:'index.js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./public/index.html',
            filename:'index.html',
            chunks:['index']
        })
    ]
}