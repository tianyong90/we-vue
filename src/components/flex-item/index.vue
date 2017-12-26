<template>
  <div class="weui-flex__item" :style="style">
    <slot />
  </div>
</template>

<script>
import { create } from '../../utils'

export default create({
  name: 'wv-flex-item',

  props: {
    flex: {
      type: [Number, String],
      default: 1
    }
  },

  computed: {
    gutter () {
      return this.$parent.gutter
    },

    style () {
      let ret = {}

      if (this.gutter) {
        ret.paddingLeft = this.gutter / 2 + 'px'
        ret.paddingRight = ret.paddingLeft
      }

      ret.flex = this.flex

      return ret
    }
  }
})
</script>

<style scoped lang="scss">
</style>
