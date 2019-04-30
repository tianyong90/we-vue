module.exports = {
  devServer: {
    disableHostCheck: true
  },
  css: {
    sourceMap: true,
    // 因为是在 monorepo 模式下使用，而且使用 yarn,所以必须要下面手动引入 postcss.config
    loaderOptions: {
      postcss: require('./postcss.config')
    }
  },
  configureWebpack: {
    resolve: {
      symlinks: false
    },
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            {
              loader: 'vue-loader',
              options: {
                compilerOptions: {
                  preserveWhiteSpace: false
                }
              }
            },
            {
              loader: '@tianyong90/vue-markdown-loader',
              options: {
                contentCssClass: 'markdown-body'
              }
            }
          ]
        }
      ]
    }
  }
}
