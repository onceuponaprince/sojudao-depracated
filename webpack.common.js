const path = require("path");
const webpack = require("webpack");
const JsConfigWebpackPlugin = require('js-config-webpack-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = {
    context: path.resolve(__dirname, './src'),
    plugins: [
        // Webpack plugin for compiltion progress report 
        new webpack.ProgressPlugin(),
        // Multi threading babel loader configuration with caching for .js and .jsx files
        new JsConfigWebpackPlugin(
            {babelConfigFile: path.resolve(__dirname, "babel.config.json")}
        ),
        // Webpack plugin for environment variables
        new Dotenv({
            path: path.resolve(__dirname, '.env'),
        }),
    ],
    resolve: {
        extensions: ["", ".js", ".jsx"],
        fallback: {
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "fs": false,
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
        },
      },
    infrastructureLogging: {
        appendOnly: true,
        level: 'verbose',
      },
}