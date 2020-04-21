const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.base.js');
const theme = require('../package.json').theme;

const devConfig = {
    mode: 'development',
    devtool: "cheap-module-eval-source-map",// 开发环境配置最佳实践
    entry: {
        main: ['webpack-hot-middleware/client?noInfo=true&reload=true', './src/app.js']
    },
    output: {
        publicPath: "./",
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },  {
                        loader: "less-loader", options: {
                            modifyVars: theme,
                            javascriptEnabled: true,
                        }
                    },
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader',
                ]
            },
        ],


    },
    devServer: {
        contentBase: path.join(__dirname, '../dist')
    },
    plugins: [
        new webpack.NamedModulesPlugin(),  //用于启动HMR时可以显示模块的相对路径
        new webpack.HotModuleReplacementPlugin(), // 开启模块热更新，热加载和模块热更新不同，热加载是整个页面刷新
    ],
};

module.exports = merge.smart(commonConfig, devConfig);


