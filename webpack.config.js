const webpack = require('webpack');
const path = require('path');

module.exports = {
	devtool: false,
	entry: {
		bundle:[
			`${__dirname}/public/js/main.js`
		],
		vendor:[
			`${__dirname}/lib/pixi.min.js`,
			`${__dirname}/lib/phaser.min.js`
		]
	},
	output: {
		path: `${__dirname}/build`,
		publicPath: '/build/',
		filename: '[name].js'
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
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					}
				]
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'file-loader?limit=8192&name=images/[name].[ext]'
			},
			{
				test: /pixi.min.js/,
				loader: 'script-loader'
			},
			{
				test: /phaser.min.js/,
				loader: 'script-loader'
			}
		]
	},
	plugins: [
		// new webpack.HotModuleReplacementPlugin(),
		// new webpack.NamedModulesPlugin()
	],
	resolve:{
		extensions: ['.js']
	},
	devServer: {
		contentBase: path.resolve(__dirname, "build"),
		port: 8080,
		inline: true,
		headers:{
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
		}
		// historyApiFallback: true
	}
}
