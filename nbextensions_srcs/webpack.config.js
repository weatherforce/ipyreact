var path = require('path');

module.exports = {
	entry:{
		breadcrumbs: './nbextensions/breadcrumbs/index.js',
		register: './nbextensions/register/index.js',
	},
    output: {
        filename: '[name]/index.js',
        path: path.resolve(__dirname, '../nbextensions_dists/'),
        libraryTarget: 'amd',
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    externals: ['base/js/namespace']
}; 