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

<script>
import RouterLink from '../mixins/router-link'
import { create } from '../utils'

export default create({
  name: 'grid-item',

  mixins: [RouterLink],

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
