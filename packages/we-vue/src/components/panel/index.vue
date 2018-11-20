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

<script lang="ts">
import '../../scss/panel.scss'

import Themeable from '../../mixins/themeable'

import mixins from '../../utils/mixins'

export default mixins(
  Themeable
  /* @vue/component */
).extend({
  name: 'wv-panel',

  props: {
    title: String
  }
})
</script>
