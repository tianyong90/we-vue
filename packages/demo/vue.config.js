module.exports = {
  devServer: {
    disableHostCheck: true
  },
  css: {
    sourceMap: false
  },
  configureWebpack: {
    resolve: {
      symlinks: false
    }
  }
}
