import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    qrcodeUrl: '',
  },

  mutations: {
    UPDATE_QRCODE_URL (state, value) {
      state.qrcodeUrl = value
    },
  },
})
