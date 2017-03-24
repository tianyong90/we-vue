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
      default: '#444'
    },
    backgroundColor: {
      type: String,
      default: '#f8f8f8'
    },
    activeColor: {
      type: String,
      default: '#f00'
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
    display: box;
    position: absolute;
    width: 100%;
    z-index: 5000;
    background-color: #fff;
  }
</style>
