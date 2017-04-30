
var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE: {
    SILENT: false
  },
  API_ROOT: '"http://mylogbook.dev"'
});
