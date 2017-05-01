
var config = require('../config');
var merge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: [config.paths.jsEntry]
  },
  output: {
    path: config.paths.dist,
    filename: '[name].js'
  },
  devtool: '#cheap-eval-source-map',
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    chunks: false,
    errors: false,
    children: false
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    compress: true,
    quiet: false,
    hot: true,
    contentBase: config.paths.public,
    publicPath: '/assets'
  },
  performance: {
    hints: false
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: ExtractTextPlugin.extract({
                use: (config.isProduction ? 'css-loader?minimize!sass-loader' : 'css-loader!sass-loader'),
                fallback: 'vue-style-loader'
            })
          },
          postcss: [
            require('autoprefixer')({
              browsers: ['last 2 versions']
            })
          ]
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'env': config.env,
      'process.env': {
        NODE_ENV: config.env.name
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require(config.paths.manifest)
    }),
    new ExtractTextPlugin('[name].css')
  ]
};

if (config.isDevelopment) {  
  module.exports.cache = true;

  module.exports.plugins = module.exports.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]);
}

if (config.isProduction) {
  module.exports.devtool = 'source-map';

  module.exports.plugins = module.exports.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: { warnings: false },
      comments: false
    })
  ]);
}
