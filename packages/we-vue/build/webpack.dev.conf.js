const path = require('path')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsChecker = require('fork-ts-checker-webpack-plugin')

const resolve = file => require('path').resolve(__dirname, file)

module.exports = merge(baseWebpackConfig, {
  devtool: 'source-map',
  entry: {
    'we-vue': './src/index.ts',
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/dist/',
    library: 'we-vue',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: resolve('../node_modules/.cache/babel-loader'),
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
              cacheDirectory: resolve('../node_modules/.cache/ts-loader'),
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
              experimentalWatchApi: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'we-vue.css',
    }),
    new ForkTsChecker({
      checkSyntacticErrors: true,
      formatter: 'codeframe',
      tsconfig: resolve('../tsconfig.json'),
    }),
  ],
})
