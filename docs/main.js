import Vue from 'vue'
import App from './app.vue'
import router from './router'
import './assets/common.scss'
import 'animate.css/animate.min.css'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.component('doc-header', () => import('./components/header'))

/* eslint-disable no-new */
new Vue({
  el: '#app',

  render: h => h(App),

  router
})
