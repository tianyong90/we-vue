module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/example/' : '/',
  outputDir: process.env.NODE_ENV === 'production' ? 'example' : 'dist',
  devServer: {
    disableHostCheck: true
  },
  css: {
    sourceMap: true
  },
  configureWebpack: {
    resolve: {
      symlinks: false
    }
  }
}
