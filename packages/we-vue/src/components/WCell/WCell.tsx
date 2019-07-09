import '@/scss/cell.scss'

import Routeable from '@/mixins/routable'

import mixins from '@/utils/mixins'

export default mixins(
  Routeable
  /* @vue/component */
).extend({
  name: 'w-cell',

  props: {
    title: {
      type: [String, Number],
    },
    value: {
      type: [String, Number],
    },
    isLink: Boolean,
  },

  methods: {
    onClick () {
      this.$emit('click')
      this.routeLink()
    },
  },

  render () {
    return (
      <div
        class={{
          'weui-cell': true,
          'weui-cell_access': this.isLink,
        }}
        onClick={this.onClick}
      >
        <div class="weui-cell_hd">
          { this.$slots.icon }
        </div>
        <div class="weui-cell__bd">
          { this.$slots.bd || <p domPropsInnerHTML={this.title} /> }
        </div>
        <div class="weui-cell__ft">
          { this.$slots.ft || this.value }
        </div>
      </div>
    )
  },
})
