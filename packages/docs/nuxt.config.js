import path from 'path'
import pkg from './package'

import _ from 'lodash'
import { nav } from './config'

// 从 config 的侧栏菜单配置中提取路由
const generatePaths = function (navs) {
  const res = _.flatMap(navs, item => {
    return item.groups
  })

  let temp = _.flatMap(res, item => {
    return item.list
  })

  temp = temp.map(item => {
    return item.path
  })

  return temp
}

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'we-vue,wevue,weui,vue,vue组件,微信组件'
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'we-vue 是一套简洁高效的 vue 组件库，封装了 weui.css，其一系列组件适合微信等移动端 web 应用开发。'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/main.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt'
  ],

  modulelsDir: ['../../node_modules'],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    parallel: false, // 这个设置为 false，因为 extractCSS 为true 时冲突

    // 生产模式下使用 extractCSS，开发时不用，以免影响热替换 hmr
    extractCSS: process.env.NODE_ENV === 'production',

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // frontmatter-markdown-loader
      config.module.rules.push({
        test: /\.md$/,
        include: [
          path.resolve(__dirname, 'markdown'),
          path.resolve(__dirname, '../../'), // 为了加载 CHANGELOG.md
        ],
        exclude: /node_modules/,
        use: [
          {
            loader: '@tianyong90/vue-markdown-loader',
            options: {
              mode: 'raw',
              // sourceDir: ''
              contentCssClass: 'markdown-body',
              markdown: {
                lineNumbers: true // enable line numbers
              }
            }
          }
        ]
      })
    }
  },

  generate: {
    routes: ['404'].concat(generatePaths(nav['v2']), generatePaths(nav['v3']))
  }
}
