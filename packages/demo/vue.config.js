module.exports = {
  devServer: {
    disableHostCheck: true,
    /**
     * IMPORTANT!!!
     * 默认情况下会忽略 node_modules 目录，这会导致 node_modules/we-vue/dist 中的文件发生变化时不会更动热替换，不便调试
     */
    watchOptions: {
      ignored: [string => string.includes('node_modules') && !string.includes('we-vue')]
    }
  },
  css: {
    sourceMap: false
  },
  configureWebpack: {
    resolve: {
      symlinks: false
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['source-map-loader'],
          enforce: 'pre'
        }
      ]
    }
  }
}
