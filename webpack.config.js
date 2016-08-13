const pkg = require('./package');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,

  entry: {
    app: ['./app/index.jsx']
  },

  devtool: process.env.WEBPACK_DEVTOOL || 'source-map',

  output: {
    path: path.join(__dirname, 'build'),
    filename: pkg.name + '.[name].js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.json'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ]
  },

  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /(node_modules)/,
        loaders: ['babel']
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin(pkg.name + '.[name].css', { allChunks: true })
  ],

  postcss: [autoprefixer],

  watch: true
}
