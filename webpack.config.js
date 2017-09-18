const webpack = require('webpack');
const path = require('path');

module.exports = {
	devtool: false,
	entry: {
		bundle:[
			`${__dirname}/public/js/main.js`
		]
	},
	output: {
		path: __dirname + '/build',
		publicPath: '/build/',
		filename: 'bundle.js'
	},
	module: {
		rules:[
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	],
	resolve:{
		extensions: ['.js']
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'build'),
		port: 8080,
		inline: true,
		hot: true,
		// historyApiFallback: true
	}
}