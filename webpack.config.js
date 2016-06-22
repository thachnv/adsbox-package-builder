var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {app: './src/js/app.js'},
  output: {
    path: path.resolve('./build'),
    filename: '[name].js',
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("app.bundle.css"),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot','babel'],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=[name].[ext]',
      },
      { test: /\.eot(\?\S*)?/, loader: 'url-loader?name=assets/[name].[ext]&limit=100000&mimetype=application/vnd.ms-fontobject' },
      { test: /\.woff2(\?\S*)?/, loader: 'url-loader?name=assets/[name].[ext]&imit=100000&mimetype=application/font-woff2' },
      { test: /\.woff(\?\S*)?/, loader: 'url-loader?name=assets/[name].[ext]&limit=100000&mimetype=application/font-woff' },
      { test: /\.ttf(\?\S*)?/, loader: 'url-loader?name=assets/[name].[ext]&limit=100000&mimetype=application/font-ttf' },
      { test: /\.svg(\?\S*)?/, loader: 'url-loader?name=assets/[name].[ext]&limit=100000&mimetype=application/font-svg' },
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve('./build'),
    headers: {"Access-Control-Allow-Origin": "*"},
    hot: true,
    noInfo: false,
    inline: true,
    stats: {colors: true}
  }
};
