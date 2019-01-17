<template>
  <div
    class="weui-tabbar__item"
    :class="{ 'weui-bar__item_on': isOn }"
    @click="onClick"
  >
    <slot name="icon" />
    <p class="weui-tabbar__label">
      <slot />
    </p>
  </div>
</template>

<script>
import tabbarItem from './tabbar-item.vue.ts'
export default tabbarItem
</script>
