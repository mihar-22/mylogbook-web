
var config = require('../config');
var webpack = require('webpack');

module.exports = {
  devtool: '#cheap-eval-source-map',
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
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: config.env.name
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DllPlugin({
      path: config.paths.manifest,
      name: '[name]'
    })
  ]
};

if (config.isProduction) {
  module.exports.devtool = 'source-map';

  module.exports.plugins = module.exports.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: { warnings: false },
      comments: false,
    })
  ]);
}
