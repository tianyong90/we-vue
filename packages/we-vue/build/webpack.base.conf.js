'use strict'
const path = require('path')
const ForkTsChecker = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const resolve = file => require('path').resolve(__dirname, file)

const scssLoaders = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: process.env.NODE_ENV === 'development',
    },
  },
  { loader: 'css-loader' },
  {
    loader: 'postcss-loader',
    options: { sourceMap: !isProd },
  },
  {
    loader: 'sass-loader',
    options: {
      implementation: require('sass'),
    },
  },
]

module.exports = {
  mode: isProd ? 'production' : 'development',
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  node: {
    fs: 'empty',
  },
  stats: {
    children: false,
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: scssLoaders,
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: resolve(`../node_modules/.cache/babel-loader`),
            },
          },
          {
            loader: 'thread-loader',
          },
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: resolve(`../node_modules/.cache/ts-loader`),
            },
          },
          {
            loader: 'thread-loader',
          },
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', 'img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', 'fonts/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
    }),
    new ForkTsChecker({
      checkSyntacticErrors: true,
      tslint: false, // TODO
      formatter: 'codeframe',
      tsconfig: resolve('../tsconfig.json'),
    }),
  ],
}
