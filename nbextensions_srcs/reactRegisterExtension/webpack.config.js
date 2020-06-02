const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
	    libraryTarget: 'amd',

	},
	module: {
		rules:[
			{
				test:/\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},
	externals: ['base/js/namespace']
}
