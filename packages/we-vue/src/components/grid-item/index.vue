<template>
  <div class="weui-grid" @click="onClick">
    <div class="weui-grid__icon" v-if="$slots.icon">
      <slot name="icon" />
    </div>
    <p class="weui-grid__label" v-if="$slots.label">
      <slot name="label" />
    </p>
    <slot/>
  </div>
</template>

<script lang="ts">
// TODO
// import '../../scss/grid-item.scss'

import Routeable from '../../mixins/routable'

import Themeable from '../../mixins/themeable'

import mixins from '../../utils/mixins'

export default mixins(
  Routeable,
  Themeable
  /* @vue/component */
).extend({
  name: 'wv-grid-item',

  methods: {
    onClick () {
      this.$emit('click')
      this.routeLink()
    }
  }
})
</script>
