import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLoading: false,
  isMainMenuVisible: true
}

export default new Vuex.Store({
  state,

  mutations: {
    UPDATE_LOADING (state, status) {
      state.isLoading = status
    },

    UPDATE_MAINMENU_VISIBLE (state, visible) {
      state.isMainMenuVisible = visible
    }
  }
})
