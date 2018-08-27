import Vue from 'vue'
import WeVue from '../packages/index.js'
import App from './app.vue'
import './assets/style/demo.scss'
import './assets/iconfont/iconfont.css'
import router from './router'
import QRCode from 'qrcode'
import store from './store'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(WeVue)

router.afterEach((to, from) => {
  document.title = to.meta.title

  const host = window.location.host
  const protocol = window.location.protocol

  const currentUrl = `${protocol}//${host}${to.fullPath}`

  QRCode.toDataURL(currentUrl)
    .then((url) => {
      store.commit('UPDATE_QRCODE_URL', url)
    })
    .catch((error) => {
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

  methods: {
    message (msg) {
      this.$toast.text(msg)
    }
  },

  watch: {
    '$route' (to, from) {
      this.transitionName = from.name === 'index' ? 'slide-left' : 'slide-right'
    }
  }
})
