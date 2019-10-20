import path, { join } from 'path'
import { Configuration } from '@nuxt/types'
import Sass from 'sass'
import Purgecss from '@fullhuman/postcss-purgecss'
import _ from 'lodash'
import pkg from './package.json'
import { nav } from './config'

const purgecss = Purgecss({
  // Specify the paths to all of the template files in your project
  content: [
    './pages/**/*.html',
    './pages/**/*.vue',
    './components/**/*.vue',
    './components/**/*.jsx',
    // etc.
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: (content: string) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  whitelist: ['html', 'body', 'nuxt-progress'],
  whitelistPatternsChildren: [/^token/, /^pre/, /^code/, /^line-numbers-wrapper/, /^line-number/],
})

const tailwindJS = join(__dirname, 'tailwind.config.js')

// 从 config 的侧栏菜单配置中提取路由
const generatePaths = function(navs: Array<any>) {
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

const config: Configuration = {
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
        content: 'we-vue,wevue,weui,vue,vue组件,微信组件',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'we-vue 是一套简洁高效的 vue 组件库，封装了 weui.css，其一系列组件适合微信等移动端 web 应用开发。',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/tailwind.css', '~assets/css/main.scss'],

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
  ],

  buildModules: ['@nuxt/typescript-build'],

  // monorepo 中使用时需要注意
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
    // 非静默，便于 CI 中输出 log
    quiet: false,

    parallel: false, // 这个设置为 false，因为 extractCSS 为true 时冲突

    // 生产模式下使用 extractCSS，开发时不用，以免影响热替换 hmr
    extractCSS: process.env.NODE_ENV === 'production',

    postcss: {
      plugins: [
        require('tailwindcss')(tailwindJS),
        require('autoprefixer'),
        ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
      ],
    },

    loaders: {
      scss: {
        implementation: Sass,
      },
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // frontmatter-markdown-loader
      config.module!.rules.push({
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
                lineNumbers: true, // enable line numbers
              },
            },
          },
        ],
      })
    },
  },

  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true,
  },

  generate: {
    routes: ['404'].concat(generatePaths(nav.v2), generatePaths(nav.v3)),
  },
}

export default config
