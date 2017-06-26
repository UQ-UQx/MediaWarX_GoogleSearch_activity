var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var path = require('path');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    //devtool: "#cheap-module-eval-source-map",
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname,"public/build"),
        filename:"bundle.js",
        publicPath:"build/"
    },
    plugins: [

/*
        new webpack.LoaderOptionsPlugin({
            debug:true,
        }),
*/
        // reloads browser when the watched files change
        new BrowserSyncPlugin({
            // use existing Apache virtual host
            proxy: 'http://localhost:80/',
            tunnel: false,
            // watch the built files and the index file
            files: ['./public/build/*', './public/index.php', './public/api/*.php']
        }),

        new webpack.ProvidePlugin({
            //jQuery : 'jquery',
            //$ : 'jquery',
            //jquery : 'jquery',
            _ : 'lodash'
        }),

        
        //new BundleAnalyzerPlugin()

    ],
    //target: 'node',
    //node: {fs: "empty"},
    module:{
        loaders:[
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                  presets: ["latest", "stage-0", "react"],
                  plugins: ["react-html-attrs", "transform-class-properties", "transform-decorators-legacy"]
                }
            },
            {
                test: /\.json$/,
                exclude: /(node_modules)/,
                loader:"json-loader",
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules)/,
                loader:"style-loader!css-loader!autoprefixer-loader!sass-loader"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    }
};
