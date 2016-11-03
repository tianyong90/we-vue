<template>
  <span
    class="vui-badge"
    :style="{ backgroundColor: color }"
    :class="[type, 'size-' + size]">
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
@import "../../assets/var.scss";

.vui-badge {
  color: white;
  text-align: center;
  display: inline-block;

  &.default {
    background-color: $color-default;
  }

  &.primary {
    background-color: $color-primary;
  }

  &.warn {
    background-color: red;
  }

  &.size-normal {
    border-radius: 12px;
    font-size: 15px;
    padding: 2px 8px;
  }

  &.size-large {
    border-radius: 14px;
    font-size: 18px;
    padding: 2px 10px;
  }

  &.size-small {
    border-radius: 8px;
    font-size: 12px;
    padding: 2px 6px;
  }
}
</style>