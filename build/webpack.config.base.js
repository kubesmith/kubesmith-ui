// external dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

// internal dependencies
const utils = require('./utils');

// exports
module.exports = {

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': utils.resolve('src'),
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [
          utils.resolve('src')
        ],
        options: {
          formatter: require('eslint-friendly-formatter'),
        }
      }, {
        test: /\.vue$/,
        use: 'vue-loader'
      }, {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        }
      }, {
        test: /\.svg(\?.*)?$/,
        resourceQuery: /import/,
        loader: 'vue-svg-loader',
      }, {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.resolve('src/images/[name].[hash:7].[ext]')
          }
        }
      }, {
        test: /\.svg(\?.*)?$/,
        loader: 'url-loader',
        resourceQuery: /normal/,
        options: {
          limit: 10000,
          name: utils.resolve('src/images/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.resolve('src/fonts/[name].[hash:7].[ext]')
          }
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: utils.resolve('src/images'),
      to: utils.resolve('dist/src/images'),
      toType: 'dir'
    }])
  ]
};
