const path = require('path');
const config = require('./dev.config');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const rootPath = process.env.PWD;

module.exports = {
    ...config,
    devtool: "none",
    mode: "production",
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'app.css',
        }),
        new HtmlWebpackPlugin({
            title: 'Fourier Listener app',
            template: path.resolve(rootPath, 'src', 'index.html')
        }),
        new CopyPlugin([
            {
                from: 'assets',
                to: path.resolve(rootPath, 'dist', 'assets')
            },
        ]),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                cache: true,
                parallel: true,
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    }
};