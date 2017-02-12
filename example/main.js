import Vue from 'vue'
import VueRouter from 'vue-router'
import WeVue from '../src/index.js'
import FastClick from 'fastclick'
import 'normalize.css/normalize.css'
import './assets/style/demo.scss'
import './assets/iconfont/iconfont.css'

document.addEventListener('DOMContentLoaded', function () {
  if (FastClick) FastClick.attach(document.body)
}, false)

Vue.use(VueRouter)
Vue.use(WeVue)

import store from './store/index.js'
import routes from './route/index.js'

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('UPDATE_LOADING', true)

  next()
})

router.afterEach((to, from) => {
  store.commit('UPDATE_LOADING', false)
})

import { mapState } from 'vuex'

new Vue({
  router,

  store,

  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    })
  },

  watch: {
    'isLoading': (value) => {
      console.log(value)
    }
  }
}).$mount('#app')
