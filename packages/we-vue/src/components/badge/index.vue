<template>
  <span
    class="weui-badge"
    :class="{ 'weui-badge_dot': isDot }"
    :style="{ 'background-color': color }"
  >
    <slot v-if="!isDot"/>
  </span>
</template>

<script lang="ts">
import '../../scss/badge.scss'

import Themeable from '../../mixins/themeable'

import mixins from '../../utils/mixins'

export default mixins(
  Themeable
  /* @vue/component */
).extend({
  name: 'wv-badge',

  props: {
    color: String,
    isDot: Boolean
  }
})
</script>
