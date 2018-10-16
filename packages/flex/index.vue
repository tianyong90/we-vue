<template>
  <div class="weui-flex" :style="style">
    <slot />
  </div>
</template>

<script>
import create from '../utils/create'

export default create({
  name: 'flex',

  props: {
    gutter: {
      type: [Number, String],
      default: 0,
      validator: val => {
        return Number(val) >= 0
      }
    }
  },

  computed: {
    style () {
      const margin = `-${Number(this.gutter) / 2}px`

      return this.gutter ? { marginLeft: margin, marginRight: margin } : {}
    }
  }
})
</script>
