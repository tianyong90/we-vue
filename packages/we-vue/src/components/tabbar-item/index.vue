<template>
  <div class="weui-tabbar__item" :class="{ 'weui-bar__item_on': isOn }" @click="onClick">
    <slot name="icon" />
    <p class="weui-tabbar__label">
      <slot />
    </p>
  </div>
</template>

<script lang="ts">
import Routeable from '../../mixins/routable'

import Vue from 'vue'

export default Vue.extend({
  name: 'wv-tabbar-item',

  mixins: [Routeable],

  props: {
    isOn: Boolean
  },

  methods: {
    onClick () {
      this.$emit('click')
      this.routeLink()
    }
  }
})
</script>
