// external dependencies
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

// exports
module.exports = merge(baseConfig, {
  mode: 'development',

  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    contentBase: './dist/',
    compress: true,
    host: 'localhost',
    port: 8080,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    publicPath: '/',
    quiet: true,
    watchOptions: {
      poll: false,
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }, {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'stylus-loader',
            options: {
              import: [
                '~nib/index.styl',
              ],
            },
          }
        ]
      }, {
        test: /\.(js|vue)$/,
        loader: 'string-replace-loader',
        options: {
          multiple: [
            { search: '@@API_URL@@', replace: process.env.API_URL },
            { search: '@@WEBSOCKET_URL@@', replace: process.env.WEBSOCKET_URL },
          ],
        },
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
  ]
});
