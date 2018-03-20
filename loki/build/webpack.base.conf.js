/* 引入操作路径模块和webpack */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    /* 输入文件 */
    entry: {
        babel: "babel-polyfill",
        index: path.resolve(__dirname, '../src/index_config.js'),
        base: path.resolve(__dirname, '../src/base_config.js'),
        signup_info: path.resolve(__dirname, '../src/signup_info_config.js'),
    },
    output: {
        /* 输出目录，没有则新建 */
        path: path.resolve(__dirname, '../static'),
        /* 静态目录，可以直接从这里取文件 */
        publicPath: '/',
        /* 文件名 */
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash].js'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                        }),
                        less: ExtractTextPlugin.extract({
                            use: 'css-loader!less-loader',
                            fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                        })
                    }
                }
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            // {
            //     test: /\.ico$/,
            //     loader: "file-loader",
            //     exclude: /node_modules/
            // }, 
            {
                test: /\.js$/,
                loader: 'babel-loader',
                /* 排除模块安装目录的文件 */
                exclude: /node_modules/
            }, {
                test: /\.pug$/,
                loader: ['html-loader', 'pug-html-loader'],
                exclude: /node_modules/
            }, {
                test: /\.(png|ico|jpg|jpeg|gif|eot|ttf|woff|woff2|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'resources/[path][name].[hash:8].[ext]',
                    }
                }]
            }, {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.pug'),
            inject: true,
            chunks: ['babel', 'index'],
            favicon: path.resolve(__dirname, '../src/images/favicon.png')
        }),
        new HtmlWebpackPlugin({
            filename: 'base.html',
            template: path.resolve(__dirname, '../src/base.pug'),
            inject: true,
            chunks: ['babel', 'base'],
            favicon: path.resolve(__dirname, '../src/images/favicon.png')
        }),
        new HtmlWebpackPlugin({
            filename: 'signup_info.html',
            template: path.resolve(__dirname, '../src/signup_info.pug'),
            inject: true,
            chunks: ['babel', 'signup_info'],
            favicon: path.resolve(__dirname, '../src/images/favicon.png')
        }),
        new HtmlWebpackPlugin({
            filename: 'jumptoindex.html',
            template: path.resolve(__dirname, '../src/jumptoindex.pug'),
            inject: true,
            chunks: [],
            favicon: path.resolve(__dirname, '../src/images/favicon.png')
        }),
        new HtmlWebpackPlugin({
            filename: 'jumptobase.html',
            template: path.resolve(__dirname, '../src/jumptobase.pug'),
            inject: true,
            chunks: [],
            favicon: path.resolve(__dirname, '../src/images/favicon.png')
        }),
        new ExtractTextPlugin('css/[name].[chunkhash:7].css', {
            allChunks: true
        })
    ]
}