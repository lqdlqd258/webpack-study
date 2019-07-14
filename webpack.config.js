let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:{
        index:'./src/index.js'
    },
    output:{
        filename:'index.js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./public/index.html'
        })
    ]
}