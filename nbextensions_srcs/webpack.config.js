const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    registry: './nbextensions/registry/index.js',
    slider: './nbextensions/slider/index.js',
    applayout: './nbextensions/applayout/index.js',
    button: './nbextensions/button/index.js',
    inputfield: './nbextensions/inputfield/index.js',
    label: './nbextensions/label/index.js'
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name][contenthash]/index.js',
    path: path.resolve(__dirname, '../nbextensions_dists/'),
    libraryTarget: 'amd'
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  externals: ['base/js/namespace']
}
