import Vue from 'vue'
import VueRouter from 'vue-router'
import WeVue from '../src/index.js'
import FastClick from 'fastclick'
import App from './app.vue'
import './assets/style/demo.scss'
import './assets/iconfont/iconfont.css'
import store from './store/index.js'
import routes from './route/index.js'
import { mapState } from 'vuex'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(WeVue)

document.addEventListener('DOMContentLoaded', function () {
  if (FastClick) FastClick.attach(document.body)
}, false)

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
  document.title = to.meta.title
})

new Vue({
  el: '#app',

  render: h => h(App),

  router,

  store,

  data () {
    return {
      transitionName: 'slide-right'
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    })
  },

  watch: {
    '$route' (to, from) {
      this.transitionName = from.name === 'index' ? 'slide-left' : 'slide-right'
    }
  }
})
