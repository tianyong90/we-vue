<template>
  <div class="weui-navbar" :style="{ position: fixed ? 'fixed' : 'absolute' }">
    <slot></slot>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'wv-navbar',

  props: {
    fixed: Boolean,
    value: {}
  },

  watch: {
    value (newValue, value) {
      this.$emit('change', newValue)
    }
  }
}
</script>
