<template>
  <div class="wv-popup" :style="{ height: height }" v-if="currentValue">
    <div class="weui-mask weui-animate-fade-in" @click="maskClick"></div>
    <div class="wv-popup-body weui-animate-slide-up">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'wv-popup',

  props: {
    isModal: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: 'auto'
    },
    value: Boolean
  },

  data () {
    return {
      currentValue: this.value
    }
  },

  methods: {
    maskClick (e) {
      if (this.isModal) return
      this.currentValue = false
    }
  },

  watch: {
    value (val) {
      this.currentValue = val
    },

    currentValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped lang="scss">
  .wv-popup-body {
    display: block;
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 5000;
    transform: translateY(100%);
    transition: transform .3s;
  }
</style>
