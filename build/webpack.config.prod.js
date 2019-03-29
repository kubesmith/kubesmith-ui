// external dependencies
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

// exports
module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }, {
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'stylus-loader',
            options: {
              import: [
                '~nib/index.styl',
                utils.resolve('src/stylus/global.styl'),
              ],
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ]
});
