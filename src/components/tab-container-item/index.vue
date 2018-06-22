<template>
  <div
    v-show="$parent.swiping || id === $parent.currentActive"
    class="wv-tab-container-item"
  >
    <slot />
  </div>
</template>

<script>
import { create } from '../../utils'

export default create({
  name: 'wv-tab-container-item',

  props: {
    id: [String, Number]
  }
})
</script>

<style scoped lang="scss">
</style>
