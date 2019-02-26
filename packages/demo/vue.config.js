module.exports = {
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
