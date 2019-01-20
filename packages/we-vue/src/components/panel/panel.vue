<template>
  <div class="weui-panel weui-panel_access">
    <div
      v-if="title"
      class="weui-panel__hd"
      v-html="title"
    />
    <div class="weui-panel__bd">
      <slot />
    </div>
    <div class="weui-panel__ft">
      <slot name="ft" />
    </div>
  </div>
</template>

<script>
import panel from './panel.vue.ts'
export default panel
</script>
