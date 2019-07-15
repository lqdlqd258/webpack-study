let path = require('path');
let webpack = require('webpack');
module.exports = {
    mode:'development',
    entry:{
        react:['react','react-dom']
    },
    output:{
        filename:'_dll_[name].js', //其中[name]会根据入口 的字段react 来赋值
        path:path.resolve(__dirname,'dist'),
        library:'_dll_[name]', //指定打包后模块 引用变量 的名称
        libraryTarget:'var' //以某种方式 去引用 如：commonjs umd var this等等(只写了library的话，默认值 var)
    },
    plugins:[
        new webpack.DllPlugin({ //生成任务清单   其中 name == library 的值
            name:'_dll_[name]',
            path:path.resolve(__dirname,'dist','manifest.json')
        })
    ]
}