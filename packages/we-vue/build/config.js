const webpack = require('webpack')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const base = require('./webpack.prod.conf')
const version = process.env.VERSION || require('../package.json').version

const builds = {
  development: {
    config: {
      devtool: 'source-map',
      mode: 'development',
      output: {
        filename: 'we-vue.js',
        libraryTarget: 'umd',
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'we-vue.css',
        }),
      ],
    },
  },
  production: {
    config: {
      mode: 'production',
      output: {
        filename: 'we-vue.min.js',
        libraryTarget: 'umd',
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'we-vue.min.css',
        }),
      ],
      performance: {
        hints: 'warning',
        maxEntrypointSize: 500000,
      },
    },
    env: 'production',
  },
}

function genConfig (opts) {
  const config = merge({}, base, opts.config)

  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(opts.env || 'development'),
    }),
  ])

  if (opts.env) {
    config.plugins = config.plugins.concat([
      new webpack.BannerPlugin({
        banner: `/*!
* we-vue v${version}
* Forged by Tian Yong
* Released under the MIT License.
*/     `,
        raw: true,
        entryOnly: true,
      }),
    ])
    config.optimization = {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorOptions: {
            discardComments: { removeAll: true },
            postcssZindex: false,
            reduceIdents: false,
          },
          canPrint: false,
        }),
      ],
    }
  }

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(builds[process.env.TARGET])
} else {
  // 同时生成 development 和 production 两种模式配置
  module.exports = Object.keys(builds).map(name => genConfig(builds[name]))
}
