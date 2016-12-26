import Vue from 'vue'
import VueRouter from 'vue-router'
import Vui from '../src/index.js'
import FastClick from 'fastclick'
import 'normalize.css/normalize.css'
import './assets/demo.scss'
import './assets/iconfont/iconfont.css'

document.addEventListener('DOMContentLoaded', function () {
  if (FastClick) FastClick.attach(document.body)
}, false)

Vue.use(VueRouter)
Vue.use(Vui)

import store from './store/index.js'

import routes from './route/index.js'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('UPDATE_LOADING', true)

  store.commit('UPDATE_MAINMENU_VISIBLE', to.matched.some(record => record.meta.showMainmenu))

  next()
})

router.afterEach((to, from) => {
  store.commit('UPDATE_LOADING', false)
})

// Vue.component('mainmenu', require('./pages/mainmenu.vue'))

new Vue({
  // 路由器
  router,

  // vuex store
  store,

  computed: {
    isLoading: () => {
      return store.state.isLoading
    }
  },

  watch: {
    'isLoading': (value) => {
      if (value) {
        Vui.Indicator.open()
      } else {
        Vui.Indicator.close()
      }
    }
  }
}).$mount('#app')
