//webpack 是采用node写法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin'); //大写，看出它是一个类，在plugins内new一个对象
// console.log(path.resolve(__dirname,'dist'));
// console.log('dist');
module.exports = {
    mode:'development',//默认模式两种 production development，生产环境会压缩，开发环境不压缩，方便查看
    entry:'./src/index.js',//入口
    output:{ //出口
        filename:'index.js',//打包后文件名
        path:path.resolve(__dirname,'build'),//路径有要求，必须是一个绝对路径,引入node的path模块，将相对路径解析成绝对路径
    },
    devServer:{
        port:3000,  //启动端口号修改
        progress:true, //内存中打包，希望有进度条
        contentBase:'./build',//以这个文件夹为启动后静态目录
        open:true,  //打开浏览器
        compress:true //采用gzip压缩,当它被设置为true的时候对所有的服务器资源采用gzip压缩 
    },
    plugins:[ //数组中放着所有的webpack插件
        new HtmlWebpackPlugin ({
            template:'./src/index.html', //指定模板路径
            filename:'index.html'
        })
    ]
}