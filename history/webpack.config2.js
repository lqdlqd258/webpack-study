let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
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
    //源码映射 会单独生成一个sourcemap(.map)文件，出错了 会标识 当前报错的列和行  特点：大而全
    devtool:'eval-source-map',//增加映射文件，可以帮我们调试源代码
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
    ]
}