<template>
  <div class="weui-tabbar" :style="{ position: fixed ? 'fixed' : 'absolute' }">
    <slot />
  </div>
</template>

<script lang="ts">
import '../../scss/tabbar.scss'

import Vue from 'vue'

export default Vue.extend({
  name: 'wv-tabbar',

  props: {
    fixed: Boolean
  }
})
</script>
