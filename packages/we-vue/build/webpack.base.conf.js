'use strict'
const utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf')
const { VueLoaderPlugin } = require('vue-loader')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ForkTsChecker = require('fork-ts-checker-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProd ? 'production' : 'development',
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  node: {
    fs: 'empty'
  },
  stats: {
    children: false
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [
      //     resolve('packages'),
      //     resolve('test'),
      //     resolve('demo'),
      //     resolve('docs')
      //   ],
      //   options: {
      //     formatter: require('eslint-friendly-formatter'),
      //     emitWarning: true
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [/\.vue$/],
          happyPackMode: isProd
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new ForkTsChecker({
      vue: true,
      tslint: false, // TODO
      checkSyntacticErrors: isProd
    })
  ]
}
