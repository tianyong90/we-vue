<template>
  <div class="weui-grids">
    <slot />
  </div>
</template>

<script lang="ts">
import '../../scss/grid.scss'

import Themeable from '../../mixins/themeable'

import mixins from '../../utils/mixins'

export default mixins(
  Themeable
  /* @vue/component */
).extend({
  name: 'wv-grid'
})
</script>
