<template>
  <div class="wv-navbar" :style="style">
    <slot></slot>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'wv-navbar',

  props: {
    fixed: Boolean,
    color: {
      type: String,
      default: '#333'
    },
    backgroundColor: {
      type: String,
      default: '#e4e4e4'
    },
    activeColor: {
      type: String,
      default: '#2196f3'
    },
    disabledColor: {
      type: String,
      default: '#cfcfcf'
    },
    lineWidth: {
      type: Number,
      default: 3
    },
    value: {}
  },

  computed: {
    style () {
      let result = {}

      result.position = this.fixed ? 'fixed' : 'absolute'
      result.backgroundColor = this.backgroundColor

      return result
    }
  },

  watch: {
    value (newValue, value) {
      this.$emit('change', newValue)
    }
  }
}
</script>

<style scoped lang="scss">
  .wv-navbar {
    display: flex;
    width: 100%;
    z-index: 5000;
    background-color: #fff;
  }
</style>
