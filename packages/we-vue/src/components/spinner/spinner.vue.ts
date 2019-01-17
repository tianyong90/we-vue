import '../../scss/spinner.scss'

import Vue from 'vue'

export default Vue.extend({
  name: 'wv-spinner',

  props: {
    type: {
      type: String,
      default: 'default',
    },
    size: {
      type: Number,
      default: 17,
    },
    color: {
      type: String,
      default: '#aaa',
    },
  },

  computed: {
    fontClassName (): string {
      switch (this.type) {
        case 'snake':
          return 'icon-spinner-1'
        case 'double-snake':
          return 'icon-spinner9'
        case 'bar-circle':
          return 'icon-spinner2'
        case 'dot-circle':
          return 'icon-spinner1'
        default:
          return ''
      }
    },

    style (): object {
      return {
        fontSize: this.size + 'px',
        color: this.color,
      }
    },
  },
})
