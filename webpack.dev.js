const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const distFolder = "./dist";

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        https: true,
        contentBase: distFolder
    }
});
