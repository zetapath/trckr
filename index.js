const environment = process.env.NODE_ENV || 'development'
global.config = require(`./config.${environment}`)
global.env = environment
require('babel-register')
require('babel-polyfill')
require('./src')
