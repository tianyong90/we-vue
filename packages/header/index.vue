<template>
  <header
    class="wv-header"
    :class="{ 'is-fixed': fixed }"
    @click.stop="$emit('headerClick')"
    :style="{ 'background-color': backgroundColor }">
    <div class="wv-header-btn left">
      <slot name="left"/>
    </div>
    <div class="wv-header-title" v-text="title"/>
    <div class="wv-header-btn right">
      <slot name="right"/>
    </div>
  </header>
</template>

<script>
import { create } from '../utils'

export default create({
  name: 'header',

  props: {
    title: String,
    fixed: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: '#21292c'
    }
  }
})
</script>

<style scoped lang="scss">
  @import "../style/header.scss";
</style>
