import Vue from 'vue'
import VueRouter from 'vue-router'
import Vui from './index.js'
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

const dispatch = store.commit || store.dispatch

import routes from './route/index.js'

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  dispatch('UPDATE_LOADING', true)

  dispatch('UPDATE_MAINMENU_VISIBLE', to.matched.some(record => record.meta.showMainmenu))

  next()
})

router.afterEach((to, from) => {
  dispatch('UPDATE_LOADING', false)
})

Vue.component('mainmenu', require('./demos/mainmenu.vue'))

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
