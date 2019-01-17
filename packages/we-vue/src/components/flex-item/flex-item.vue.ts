import Vue from 'vue'
// TODO
// import '../../scss/flex-item.scss'

import WVFlex from '../flex'
// TODO
// import WVFlexItem from './index'

// Utils
import mixins from '../../utils/mixins'

// Mixins
import Colorable from '../../mixins/colorable'

type WVFlexInstance = InstanceType<typeof WVFlex>

interface options extends Vue {
  flexComponent: WVFlexInstance
}

export default mixins<options>(
  Colorable
  /* @vue/component */
).extend({
  name: 'wv-flex-item',

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
})
