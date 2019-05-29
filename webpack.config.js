//webpack 是采用node写法
let path = require('path');
// console.log(path.resolve(__dirname,'dist'));
// console.log('dist');
module.exports = {
    mode:'development',//默认模式两种 production development，生产环境会压缩，开发环境不压缩，方便查看
    entry:'./src/index.js',//入口
    output:{ //出口
        filename:'index.js',//打包后文件名
        path:path.resolve(__dirname,'dist'),//路径有要求，必须是一个绝对路径,引入node的path模块，将相对路径解析成绝对路径
    }
}