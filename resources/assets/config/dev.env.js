
var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  name: JSON.stringify('development'),
  vue: {
    silent: false
  },
  mylb: {
    url: JSON.stringify('http://mylogbook.dev'),
  	api_url: JSON.stringify('http://mylogbook.dev/api/v1')
  }
});
