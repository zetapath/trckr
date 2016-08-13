require('babel-register')
require('babel-polyfill')
const hook = require('css-modules-require-hook');

hook({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
});
// hook({
//   // rootDir: path.join(__dirname, './'),
//   rootDir: path.join(__dirname, '../app'),
//   extensions: [ '.scss' ],
//   generateScopedName: '[name]__[local]___[hash:base64:5]',
//   preprocessCss: function (data) {
//     return sass.renderSync({ data: data }).css
//   }
// })
const environment = process.env.NODE_ENV || 'development'
global.config = require(`./config.${environment}`)
global.env = environment

require('./server')
