
var path = require('path');

var env = (process.env.NODE_ENV === 'production') ? require('./prod.env') : require('./dev.env');

var paths = {
  nodeModules: path.resolve(__dirname, '../../../node_modules'),
  public: path.resolve(__dirname, '../../../public'),
  dist: path.resolve(__dirname, '../../../public/dist'),
  js: path.resolve(__dirname, '../../../public/dist'),
  css: path.resolve(__dirname, '../../../public/dist'),
  src: path.resolve(__dirname, '../src'),
  jsEntry: path.resolve(__dirname, '../src/App.vue'),
  components: path.resolve(__dirname, '../src/components'),
  manifest: path.resolve(__dirname, '../src/bootstrap-manifest.json'),
  bootstrap: path.resolve(__dirname, '../src/bootstrap.js'),
};

module.exports = {
  paths,
  env,
  isProduction: (process.env.NODE_ENV === 'production'),
  isDevelopment: (process.env.NODE_ENV === 'development')
};
