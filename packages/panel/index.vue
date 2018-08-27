<template>
  <div class="weui-panel weui-panel_access">
    <div class="weui-panel__hd" v-if="title" v-html="title" />
    <div class="weui-panel__bd">
      <slot />
    </div>
    <div class="weui-panel__ft">
      <slot name="ft" />
    </div>
  </div>
</template>

<script>
import { create } from '../utils'

export default create({
  name: 'panel',

  props: {
    title: String
  }
})
</script>

<style scoped lang="scss">
</style>
