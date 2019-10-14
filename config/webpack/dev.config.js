const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const rootPath = process.env.PWD;

module.exports = {
    target: 'web',
    mode: 'development',
    devtool: 'eval-source-map',
    entry: path.resolve('src', 'App.tsx'),
    output: {
        filename: 'app.js',
        path: path.resolve(rootPath, 'build'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
        alias: {
            '~': path.resolve(rootPath, 'src'),
            assets: path.resolve(rootPath, 'assets')
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // 'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'app.css',
        }),
        new HtmlWebpackPlugin({
            title: 'Fourier Listener app',
            template: path.resolve('src', 'index.html')
        }),
        new CopyPlugin([
            {
                from: 'assets',
                to: path.resolve('build', 'assets')
            },
        ]),
        new LiveReloadPlugin({
            delay: 3000,
        }),
    ],
};