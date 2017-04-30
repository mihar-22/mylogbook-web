
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
  stats: {
    colors: true,
    chunks: false,
    children: false
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [config.paths.nodeModules],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': config.paths.src
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  resolveLoader: {
    fallback: [config.paths.nodeModules]
  },
  cache: true,
  devtool: config.development.sourceMap,
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            {{#sass}}
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
            {{/sass}}
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  vue: {
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'env': config.development.env
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require(config.paths.manifest)
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = config.production.sourceMap;

  module.exports.output = {
      path: config.paths.dist,
      filename: '[name].min.js'
  };

  module.exports.plugins.push([
    new ExtractTextPlugin('[name].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]);
}
