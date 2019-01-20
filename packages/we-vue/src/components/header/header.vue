<template>
  <header
    class="wv-header"
    :class="{ 'is-fixed': fixed }"
    @click.stop="$emit('headerClick')"
    :style="{ 'background-color': backgroundColor }"
  >
    <div class="wv-header-btn left">
      <slot name="left" />
    </div>
    <div class="wv-header-title" v-text="title" />
    <div class="wv-header-btn right">
      <slot name="right" />
    </div>
  </header>
</template>

<script>
import header from './header.vue.ts'
export default header
</script>
