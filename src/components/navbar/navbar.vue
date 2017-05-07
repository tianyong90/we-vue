<template>
  <div class="wv-navbar" :style="style">
    <slot></slot>
  </div>
</template>

<script>
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
        default: '#fff'
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
        return {
          position: this.fixed ? 'fixed' : 'absolute',
          backgroundColor: this.backgroundColor
        }
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
