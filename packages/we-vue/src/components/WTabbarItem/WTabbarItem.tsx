// Utils
import mixins from '../../utils/mixins'

// Mixins
import Routeable from '../../mixins/routable'

export default mixins(
  Routeable
).extend({
  name: 'w-tabbar-item',

  mixins: [Routeable],

  props: {
    isOn: Boolean,
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
          'weui-tabbar__item': true,
          'weui-bar__item_on': this.isOn,
        }}
        onClick={() => { this.onClick() }}
      >
        {this.$slots.icon}
        <p class="weui-tabbar__label">
          {this.$slots.default}
        </p>
      </div>
    )
  },
})
