var cooking = require('cooking');
var webpack = require('webpack');
var config = require('./config');

cooking.set({
  entry: './example/main.js',
  dist: './dist',
  template: './example/index.html',
  devServer: {
    port: 8080,
    host: require('my-local-ip')(),
    publicPath: '/',
    log: false
  },
  clean: true,
  hash: true,
  publicPath: '/',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  extractCSS: true,
  sourceMap: true,
  extends: ['vue2', 'lint', 'sass', 'autoprefixer'],
  alias: config.alias,
  externals: {},
  static: 'example/static',

});

cooking.add('loader.js.exclude', config.jsexclude);

if (process.env.NODE_ENV !== 'production') {
  cooking.add('plugins.Define', new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }));
}

module.exports = cooking.resolve();
