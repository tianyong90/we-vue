import '@/scss/spinner.scss'

import Vue from 'vue'

export default Vue.extend({
  name: 'w-spinner',

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
    fontclass (): string {
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

  render () {
    if (this.type === 'default') {
      return <i class="weui-loading" style={this.style} />
    } else {
      return (
        <span class="wv-spinner">
          <i
            class={{
              'iconfont': true,
              [this.fontclass]: true,
            }}
            style={this.style} />
        </span>
      )
    }
  },
})
