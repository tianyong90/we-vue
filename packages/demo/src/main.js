import Vue from 'vue'
import App from './App.vue'
import WeVue from 'we-vue'
import './assets/style/demo.scss'
import './assets/iconfont/iconfont.css'
import router from './router'
import QRCode from 'qrcode'
import store from './store'
import 'we-vue/dist/we-vue.css'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(WeVue)

router.afterEach((to, from) => {
  document.title = to.meta.title

  const host = window.location.host
  const protocol = window.location.protocol

  const currentUrl = `${protocol}//${host}${to.fullPath}`

  QRCode.toDataURL(currentUrl)
    .then(url => {
      store.commit('UPDATE_QRCODE_URL', url)
    })
    .catch(error => {
      console.error(error)
    })
})

/* eslint-disable no-new */
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

  watch: {
    $route (to, from) {
      this.transitionName = from.name === 'index' ? 'slide-left' : 'slide-right'
    }
  }
})
