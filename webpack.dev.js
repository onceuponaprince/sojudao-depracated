const path = require('path');
const webpack = require("webpack");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  profile: true,
  devtool: 'eval',
  devServer: {
    static:{ 
      directory: path.resolve(__dirname, './dist')
    },
    historyApiFallback: true,
    compress: true,
    hot: true,
    open: true,
    port: 9001,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      generateStatsFile: true
    }),
    new BundleStatsWebpackPlugin({
      baseline: true
    }),
  ]
});