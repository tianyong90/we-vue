<template>
  <div class="weui-grids">
    <slot />
  </div>
</template>

<script>
import { create } from '../utils'

export default create({
  name: 'grid'
})
</script>

<style scoped lang="scss">
</style>
