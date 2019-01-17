<template>
  <div class="wv-tab__pane" v-show="isSelected">
    <slot v-if="inited" />
    <div v-if="$slots.title" ref="title">
      <slot name="title" />
    </div>
  </div>
</template>

<script>
import tab from './tab.vue.ts'
export default tab
</script>
