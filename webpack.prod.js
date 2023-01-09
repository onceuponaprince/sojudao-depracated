const path = require('path')
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ImageConfigWebpackPlugin = require('image-config-webpack-plugin');
const FontConfigWebpackPlugin = require('font-config-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = merge(common, {
    plugins: [
        new WebpackManifestPlugin(),
        /* Common Config Suite
         * https://github.com/merkle-open/webpack-config-plugins */
        // Cleans the dist folder before the build starts
        new CleanWebpackPlugin(),
        
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    stats: {
        children: true
    },
    profile: true,
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                reactVendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'reactVendor',
                    chunks: 'all',
                },
                lodashVendor: {
                    test: /[\\/]node_modules[\\/](lodash)[\\/]/,
                    name: 'lodashVendor',
                    chunks: 'all',
                },
            },
        },
    },
})
  