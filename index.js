require('babel-register');
require('babel-polyfill');
const hook = require('css-modules-require-hook');

hook({ generateScopedName: '[name]__[local]___[hash:base64:5]' });

const environment = process.env.NODE_ENV || 'development';
global.config = require(`./config.${environment}`);
global.env = environment;

require('./server');
