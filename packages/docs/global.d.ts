import VueI18n from 'vue-i18n'

declare module 'vue/types/vue' {
  interface Vue {
    $t: typeof VueI18n.prototype.t
  }
}
