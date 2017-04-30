
var merge = require('webpack-merge');
var path = require('path');

var paths = {
  nodeModules: path.resolve(__dirname, '../../../node_modules'),
  dist: path.resolve(__dirname, '../../../public/dist'),
  js: path.resolve(__dirname, '../../../public/dist'),
  css: path.resolve(__dirname, '../../../public/dist'),
  src: path.resolve(__dirname, '../src'),
  jsEntry: path.resolve(__dirname, '../src/App'),
  components: path.resolve(__dirname, '../src/components'),
  manifest: path.resolve(__dirname, '../src/bootstrap-manifest.json'),
  bootstrap: path.resolve(__dirname, '../src/bootstrap.js'),
};

var production = {
  env: require('./prod.env'),
  sourceMap: 'source-map'
};

var development = {
  env: require('./dev.env'),
  sourceMap: '#cheap-module-eval-source-map',
  extractCSS: true,
  port: 8080,
  proxyTable: {}
};

module.exports = {
  paths,
  production,
  development
};
