const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  devtool: 'source-map',
  entry: {
    'we-vue': './src/index.ts'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'we-vue.min.js',
    library: 'we-vue',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'we-vue.min.css'
    }),
  ],
  performance: {
    hints: 'warning',
    maxEntrypointSize: 500000,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          postcssZindex: false,
          reduceIdents: false
        },
        canPrint: false
      })
    ]
  }
})
