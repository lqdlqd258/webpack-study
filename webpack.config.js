//webpack 是采用node写法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');                             //(html打包插件)大写，看出它是一个类，在plugins内new一个对象
let MinCssExtractPlugin = require('mini-css-extract-plugin');                       //(抽离css样式插件) 把html上的style标签内的css抽离，变成以link标签形式外部引入
                                                                                    //([cnpm install] postcss-loader autoprefixer) 给css内的一些属性添加前缀，在loader内配置
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');        //([cnpm install] TerserJSPlugin optimize-css-assets-webpack-plugin) 压缩打包后的css文件
let TerserJSPlugin = require('terser-webpack-plugin');                 
                                                                                    //([cnpm install] babel-loader(转换加载器) @babel/core(babel核心模块) @babel/preset-env(告诉怎么转化)) 解析es6语法 还有es7语法 @babel/plugin-proposal-class-properties
let webpack = require('webpack');
// console.log(path.resolve(__dirname,'dist'));
// console.log('dist');
module.exports = {
    mode:'development',//默认模式两种 production development，生产环境会压缩js代码，开发环境不压缩，方便查看
    entry:'./src/index.js',//入口
    output:{ //出口
        filename:'index.[hash:8].js',//打包后文件名,加hash，每次打包产生不同的xxx[hash].js文件
        path:path.resolve(__dirname,'build'),//路径有要求，必须是一个绝对路径,引入node的path模块，将相对路径解析成绝对路径
    },
    devServer:{
        port:8000,  //启动端口号修改
        progress:true, //内存中打包，希望有进度条
        contentBase:'./build',//以这个文件夹为启动后静态目录
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
        }),
        new MinCssExtractPlugin ({
            filename:'main.css'
        }),
        //提供插件
        // new webpack.ProvidePlugin({ //在每个模块中都注入$
        //     $:'jquery'
        // })
    ],
    //可以忽略一些要打包文件
    // externals:{
    //     jquery:'jQuery'
    // },
    module:{ //模块
        rules:[ //规则 
            // {
            //     test:/\.js$/,
            //     use:{
            //         //规范js语法 ([cnpm install] eslint eslint-loader -D)  可以到npm官网查配置 以及eslint官网查用法
            //         loader:'eslint-loader',
            //         options:{
            //             enforce:'pre', //previous (强制这个loader在其他普通loader之前执行)  post(在普通loader之后执行)
            //             exclude: /node_modules/
            //         }
            //     },
            // },
            {
                test:/\.html$/,
                use:'html-withimg-loader'
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:'file-loader'
            },
            //es6语法解析loader
            {
                test:/\.js$/, //普通loader
                use:{
                    loader:'babel-loader',
                    options:{//用babel-loader 把es6转换成es5
                        //(大插件集合)这里可以添加大的插件库presets，把es6转化成es5
                        presets:[
                            '@babel/preset-env'
                        ],
                        //(小插件)es7，以及一些内置API方法
                        plugins:[
                            // 'npm @babel/plugin-proposal-class-properties -D' //更高级的语法 需要配置 到官网babeljs.io查看
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],//如用语法@log装饰器,下载这插件
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                            "@babel/plugin-transform-runtime"  //@babel/plugin-transform-runtime @babel/runtime -D
                        ]
                    }
                },
                include:path.resolve(__dirname,'src'), //包括
                exclude:/node_modules/ //排除 node_modules
            },
            //css-loader主要负责解析@import这种语法的，把css压缩成一个css ()
            //style-loader 他是把css插入到html页面head的标签中
            //loader的特点 希望单一
            //loader的用法 一个loader字符串，多个loader需要数组
            //loader的顺序 默认从右向左执行 从下到上执行
            {test:/\.css$/,use:[
                    MinCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader', //css 自动添加前缀 ([cnpm install] postcss-loader autoprefixer,在外部添加postcss.config.js配置)
                ]
            },
            //处理less文件 
            //less([cnpm install] less less-loader)
            //sass ([cnpm install] node-sass sass-loader)
            //stylus ([cnpm install] stylus stylus-loader)
            {test:/\.less$/,use:[
                    MinCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader' //less转换成css
                ]
            }
        ]
    },
    optimization: { //css打包代码压缩优化项 
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})], //用terser-webpack-plugin替换掉uglifyjs-webpack-plugin解决uglifyjs不支持es6语法问题
      },
}