<template>
</template>

<script type="text/babel">
import Vue from 'vue'
import VueFinger from 'vue-finger'

Vue.use(VueFinger)
import 'weui/dist/style/weui.min.css'

export default {
  name: 'wv-slider',

  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    value: {
      type: Number
    },
    disabled: Boolean
  },

  computed: {
    progress () {
      const value = this.value
      if (typeof value === 'undefined' || value === null) return 0

      return Math.floor((value - this.min) / (this.max - this.min) * 100)
    }
  },

  methods: {
    onPressmove (e) {
      if (this.disabled) return

      this.$emit('input', 100)
    },

    onTouchend (e) {
      // console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
</style>