<template>
  <div class="weui-flex" :style="style">
    <slot />
  </div>
</template>

<script lang="ts">
import '../../scss/flex.scss'

import Themeable from '../../mixins/themeable'

import mixins from '../../utils/mixins'

export default mixins(
  Themeable
  /* @vue/component */
).extend({
  name: 'wv-flex',

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
