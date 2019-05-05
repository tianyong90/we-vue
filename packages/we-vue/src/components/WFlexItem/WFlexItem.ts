import Vue, { VNode } from 'vue'

import WFlex from '../WFlex'

type WFlexInstance = InstanceType<typeof WFlex>

interface options extends Vue {
  flexComponent: WFlexInstance
}

export default Vue.extend<options>().extend({
  name: 'w-flex-item',

  inject: {
    flexComponent: {
      default: null,
    },
  },

  props: {
    flex: {
      type: [Number, String],
      default: 1,
    },
    offset: {
      type: String,
      default: '',
    },
  },

  computed: {
    gutter (): number {
      return (Number(this.flexComponent.gutter)) || 0
    },

    style (): object {
      const padding = `${Number(this.gutter) / 2}px`

      let ret = this.gutter
        ? {
          paddingLeft: padding,
          paddingRight: padding,
        }
        : {}

      return { ...ret, ...{ flex: Number(this.flex), marginLeft: this.offset } }
    },
  },

  render (): VNode {
    return h('div', {
      class: 'weui-flex__item',
      style: this.style,
    }, [
      this.$slots.default,
    ])
  },
})
