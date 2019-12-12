const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// cleans dist folder
const CleanWebpackPlugin = require('clean-webpack-plugin');
const distFolder = "./dist";

module.exports = merge(common, {
    entry: './src/tests/unittests/index.ts',
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
        template: 'src/tests/unittests/index.ejs'
        })
    ],
    devServer: {
        contentBase: distFolder
    }
});
