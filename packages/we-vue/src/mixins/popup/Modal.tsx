import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import { styleObject } from '../../globals'

interface options extends Vue {
  style?: styleObject
}

export default Vue.extend<options>().extend({
  name: 'wv-modal',

  props: {
    visible: Boolean,
    zIndex: Number,
    className: String,
    customStyle: Object as PropValidator<styleObject>,
  },

  computed: {
    style (): styleObject {
      return {
        zIndex: this.zIndex,
        ...this.customStyle,
      }
    },
  },

  render (h): VNode {
    return (
      <transition name="wv-fade">
        <div
          vShow={this.visible}
          class={[
            'wv-modal',
            this.className,
          ]}
          style={this.style}
          onClick={(event: Event) => {
            this.$emit('click', event)
          }}
        />
      </transition>
    )
  },
})
