"use strict";
var webpack = require("webpack");

var webpackConfig = require('./webpack.config.js');

//webpackConfig.devtool = "";
// strip out console.log statements
webpackConfig.module.loaders.push({
	test: /\.js$/,
	exclude: /node_modules/,
	loader: 'strip-loader?strip[]=console.log'
});

module.exports = webpackConfig;
