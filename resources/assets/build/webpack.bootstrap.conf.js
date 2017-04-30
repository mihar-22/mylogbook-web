              
var config = require('../config');
var webpack = require('webpack');

module.exports = {
  devtool: config.production.sourceMap,
  entry: {
    bootstrap: [config.paths.bootstrap]
  },
  output: {
    path: config.paths.js,
    publicPath: '/',
    filename: '[name].js',
    library: '[name]'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [config.paths.nodeModules],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  resolveLoader: {
    fallback: [config.paths.nodeModules]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.production.env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DllPlugin({
      path: config.paths.manifest,
      name: '[name]'
    })
  ]
};
