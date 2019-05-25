// import { Store } from 'vuex'

type Theme = 'light' | 'dark'

export const state = () => ({
  locales: ['en', 'zh-cn'],
  locale: 'en',
  theme: 'light',
})

export const mutations = {
  SET_LANG(state, locale: string): void {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },

  SET_THEME(state, theme: Theme): void {
    state.theme = theme
  },
}
