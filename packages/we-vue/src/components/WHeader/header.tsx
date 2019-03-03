import Vue from 'vue'
import '../../scss/header.scss'

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

  render (h) {
    return (
      <header
        class={{
          'wv-header': true,
          'is-fixed': this.fixed,
        }}
        onClick_stop={() => {
          this.$emit('headerClick')
        }}
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
