<template>
  <div :class="'weui-swiped-btn weui-swiped-btn_' + type">
    <slot />
  </div>
</template>

<script lang="ts">
import '../../scss/cell-swipe-button.scss'

import Vue from 'vue'

export default Vue.extend({
  name: 'wv-cell-swipe-button',

  props: {
    type: {
      type: String,
      default: 'default'
    }
  }
})
</script>
