const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
//=== "development"
const mode = process.env.NODE_ENV ; // 启动时设置的全局变量，会有都在process.env当中。

function resolve (dir) {
    return path.join(__dirname,  dir)
}
console.log("resolve", resolve('src'));
var config = {
    // entry: {app: path.join(__dirname, "src/main.js")},
    entry: path.join(__dirname, "src/main.js"),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },
    resolve:{
        extensions: ['.js', '.vue', '.json'],
        alias:{
            '@': resolve('src'),
            /**
             * 运行时构建不包含模板编译器，因此不支持 template 选项，只能用 render 选项，但即使使用运行时构建，
             * 在单文件组件中也依然可以写模板，因为单文件组件的模板会在构建时预编译为 render 函数。
             *
             * 如果我们想使用template，我们不能直接在客户端使用npm install之后的vue
             */
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.jsx$/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader","css-loader"
                ]
            },
            {
                test: /\.(styl|less)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                    "stylus-loader"  //stylus 很好用的css预处理器  (可以研究一下)
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg|woff2?|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,   // 小于1024 就会将图片转换为base64代码，写入到输出文件中
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HTMLPlugin({
            filename: 'index.html',
            template: resolve('index.tpl.html'),
            title: 'webpack-vue-single',
            inject: true,
            favicon: resolve('favicon.ico'),
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
if(mode === 'development'){
    // config.devTool = "#cheap-module-source-map" //编译速度慢，
    // config.devTool = "#cheap-module-eval-source-map" //编译速度快，但可能会发生行号对不上的情况
    config.devtool = 'inline-source-map',
    config.devServer={
        port: 8090,
        compress: true,
        host: "127.0.0.1",
        overlay: {
            errors: true
        },
        hot: true,
        historyApiFallback: {
            //做单页应用时，通常会做前端路由，我们页面请求进来的地址不一定就是我们默认的index.html页面
            //这个能帮助我们将本身不理解的地址，没有做映射的地址都映射到一个入口index.html 上面去
        },
        open: true //webpack开启后 自动打开浏览器

    }
}


module.exports = config;