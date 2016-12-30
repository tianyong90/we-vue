<template>
  <span class="weui-badge" :class="{ 'weui-badge_dot': isDot }" :style="{ 'background-color': color }">
    <slot v-if="!isDot"></slot>
  </span>
</template>

<script type="text/babel">
export default {
  name: 'wv-badge',

  props: {
    color: String,
    isDot: Boolean
  }
}
</script>
