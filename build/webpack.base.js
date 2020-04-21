const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const commonConfig = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader'
                }],
            },

            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]', // placeholder 占位符
                        outputPath: 'images/', // 打包文件名
                        limit: 102400, // 小于100kb则打包到js文件里，大于则使用file-loader的打包方式打包到imgages里
                    },
                },
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]-[hash:5].min.[ext]', // 和上面同理
                        outputPath: 'fonts/',
                        limit: 5000,
                    }
                },
            },


        ],


    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    }


};

module.exports = commonConfig;


