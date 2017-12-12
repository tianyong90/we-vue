<template>
  <div class="weui-grids">
    <slot></slot>
  </div>
</template>

<script>
  import { create } from '../../utils'

  export default create({
    name: 'wv-grid'
  })
</script>

<style scoped lang="scss">
</style>
