<template>
  <div class="weui-tabbar__item" :class="{ 'weui-bar__item_on': isOn }" @click="onClick">
    <slot name="icon" />
    <p class="weui-tabbar__label">
      <slot />
    </p>
  </div>
</template>

<script>
import RouterLink from '../mixins/router-link'

import { create } from '../utils'

export default create({
  name: 'tabbar-item',

  mixins: [RouterLink],

  props: {
    isOn: Boolean
  },

  methods: {
    onClick () {
      this.$emit('click')
      this.routerLink()
    }
  }
})
</script>

<style scoped lang="scss">
</style>
