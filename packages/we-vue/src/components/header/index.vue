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

<script lang="ts">
import '../../scss/header.scss'

import Themeable from '../../mixins/themeable'

import mixins from '../../utils/mixins'

export default mixins(
  Themeable
  /* @vue/component */
).extend({
  name: 'wv-header',

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
