import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLoading: false,
  direction: 'forward',
  isMainMenuVisible: true,
  isLogin: false
}

export default new Vuex.Store({
  state,
  mutations: {
    UPDATE_LOADING (state, status) {
      state.isLoading = status
    },
    UPDATE_DIRECTION (state, direction) {
      state.direction = direction
    },
    UPDATE_MAINMENU_VISIBLE (state, visible) {
      state.isMainMenuVisible = visible
    },
    UPDATE_IS_LOGIN (state, isLogin) {
      state.isLogin = isLogin
    }
  }
})
