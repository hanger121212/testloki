const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const webpack = require('webpack');

// add hot-reload related code to entry chunks
Object.keys(baseConfig.entry).forEach(function (name) {
    baseConfig.entry[name] = ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true'].concat(baseConfig.entry[name])
})

let devConfig = merge(baseConfig, {
    output: {
        path: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
});

module.exports = devConfig;