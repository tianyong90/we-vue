const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const isMinify = process.argv.indexOf('-p') !== -1

delete baseWebpackConfig.devServer

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    'we-vue': './es/index.js'
  },
  devtool: false,
  output: {
    path: path.join(__dirname, '../lib'),
    library: 'we-vue',
    libraryTarget: 'umd',
    filename: isMinify ? '[name].min.js' : '[name].js',
    umdNamedDefine: true,
    globalObject: 'this'

  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  performance: false,
  optimization: {
    minimize: isMinify
  }
})

module.exports = webpackConfig
