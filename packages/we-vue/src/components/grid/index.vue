<template>
  <div class="weui-grids">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import '../../scss/grid.scss'

export default Vue.extend({
  name: 'wv-grid',
})
</script>
