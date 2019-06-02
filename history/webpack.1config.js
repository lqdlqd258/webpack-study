//webpack 是采用node写法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin'); //大写，看出它是一个类，在plugins内new一个对象
// console.log(path.resolve(__dirname,'dist'));
// console.log('dist');
module.exports = {
    mode:'development',//默认模式两种 production development，生产环境会压缩js代码，开发环境不压缩，方便查看
    entry:'./src/index.js',//入口
    output:{ //出口
        filename:'index.[hash:8].js',//打包后文件名,加hash，每次打包产生不同的xxx[hash].js文件
        path:path.resolve(__dirname,'ljc'),//路径有要求，必须是一个绝对路径,引入node的path模块，将相对路径解析成绝对路径
    },
    devServer:{
        port:8000,  //启动端口号修改
        progress:true, //内存中打包，希望有进度条
        contentBase:'./ljc',//以这个文件夹为启动后静态目录
        open:true,  //打开浏览器
        compress:true //采用gzip压缩,当它被设置为true的时候对所有的服务器资源采用gzip压缩 
    },
    plugins:[ //数组中放着所有的webpack插件
        new HtmlWebpackPlugin ({
            template:'./src/index.html', //指定模板路径
            filename:'index.html', //修改打包后的html文件名称,如果不是index.html，则启动服务后就要自己选择
            minify:{
                removeAttributeQuotes:true, //删除html内的双引号
                collapseWhitespace:true, //折叠空行，所有代码压缩成一整行
            },
            hash:true //添加hash，每次文件改动，html引入的文件路径都加入了hash
        })
    ],
    module:{ //模块
        rules:[ //规则 
            //css-loader主要负责解析@import这种语法的，把css压缩成一个css ()
            //style-loader 他是把css插入到html页面head的标签中
            //loader的特点 希望单一
            //loader的用法 一个loader字符串，多个loader需要数组
            //loader的顺序 默认从右向左执行 从下到上执行
            {test:/\.css$/,use:[
                    {
                    loader:'style-loader',
                    options:{
                        insertAt:'top'
                        }
                    },'css-loader'
                ]
            },
            //处理less文件 
            //less([cnpm install] less less-loader)
            //sass ([cnpm install] node-sass sass-loader)
            //stylus ([cnpm install] stylus stylus-loader)
            {test:/\.less$/,use:[
                    {
                    loader:'style-loader',
                    options:{
                        insertAt:'top'
                        }
                    },
                    'css-loader',
                    'less-loader' //less转换成css
                ]
            }
        ]
    }
}