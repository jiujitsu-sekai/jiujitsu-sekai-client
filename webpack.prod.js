const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const distFolder = "./dist";

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map'
});