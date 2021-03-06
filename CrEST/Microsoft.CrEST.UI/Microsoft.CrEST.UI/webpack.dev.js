var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    entry: {
        'app': './angularCrest/app/main.ts'
    },
    devtool: 'source-map',
    performance: {
        hints: false
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
    },
    output: {
        path: path.join(__dirname, 'wwwroot'),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpg|gif|ico|woff|woff2|ttf|svg|eot)$/,
                loader: 'file-loader?name=assets/[name].[ext]'
            },
            //// Load css files which are required in vendor.ts
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }

        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].bundle.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'polyfills']
        }),
        new CleanWebpackPlugin(
            [
                './wwwroot/js/',
                './wwwroot/css/',
                './wwwroot/assets/',
                './wwwroot/index.html',
                './wwwroot/vendor/',
                './wwwroot/configMetadata/'
            ]
        ),
        // inject in index.html
        new HtmlWebpackPlugin({
            template: './angularCrest/index.html',
            inject: 'body',
            filename: 'index.html'
        }),
        // webpack.config.js
        new webpack.ProvidePlugin({
            "Handsontable": "handsontable/dist/handsontable.full.js",
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
        new CopyWebpackPlugin([
            { from: './angularCrest/vendor', to: 'vendor' },
            { from: './angularCrest/styles', to: 'css' },
            { from: './angularCrest/app/configMetadata', to: 'configMetadata' }
        ])
    ],
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
};