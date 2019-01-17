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

<script lang="ts">
import Vue from 'vue'
import '../../scss/panel.scss'

export default Vue.extend({
  name: 'wv-panel',

  props: {
    title: String,
  },
})
</script>
