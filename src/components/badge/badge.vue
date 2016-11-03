<template>
  <span
    class="vui-badge"
    :style="{ backgroundColor: color }"
    :class="['is-' + type, 'is-size-' + size]">
    <slot></slot>
  </span>
</template>

<script type="text/babel">
export default {
  name: 'vui-badge',

  props: {
    color: String,
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'normal'
    }
  }
}
</script>

<style scoped lang="scss">
.vui-badge {
  color: white;
  text-align: center;
  display: inline-block;

  background-color: red;
  
  border-radius: 12px;
  font-size: 15px;
  padding: 2px 8px;

}
</style>