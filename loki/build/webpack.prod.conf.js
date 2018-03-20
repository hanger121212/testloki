const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const webpack = require('webpack');

for (let i = 0; i < baseConfig.plugins.length; i++) {
	if (baseConfig.plugins[i].options.chunks) {
		baseConfig.plugins[i].options.chunks.push('vendors');
	}
}

let prodConfig = merge(baseConfig, {
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			comments: false, // 去掉注释
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors',
			filename: 'js/[name].[hash].js'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
	]
});

module.exports = prodConfig;