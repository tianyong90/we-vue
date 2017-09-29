import Vue from 'vue'
import WeVue from '../src/index.js'
import App from './app.vue'
import './assets/style/demo.scss'
import './assets/iconfont/iconfont.css'
import store from './store/index.js'
import router from './router'
import { mapState } from 'vuex'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(WeVue)

router.beforeEach((to, from, next) => {
  store.commit('UPDATE_LOADING', true)
  next()
})

router.afterEach((to) => {
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
