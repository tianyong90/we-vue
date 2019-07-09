import Vue from 'vue'
import '@/scss/header.scss'

export default Vue.extend({
  name: 'w-header',

  props: {
    title: String,
    fixed: {
      type: Boolean,
      default: true,
    },
    backgroundColor: {
      type: String,
      default: '#21292c',
    },
  },

  methods: {
    onClick (e: Event) {
      e.stopPropagation()
      this.$emit('headerClick')
    },
  },

  render () {
    return (
      <header
        class={{
          'wv-header': true,
          'is-fixed': this.fixed,
        }}
        onClick={this.onClick}
        style={{ 'background-color': this.backgroundColor }}
      >
        <div class="wv-header-btn left">
          {this.$slots.left}
        </div>
        <div class="wv-header-title" domPropsTextContent={this.title} />
        <div class="wv-header-btn right">
          {this.$slots.right}
        </div>
      </header>
    )
  },
})
