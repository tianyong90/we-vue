<template>
	<div class="weui-slider-box">
    <div class="weui-slider">
      <div id="sliderInner" class="weui-slider__inner">
        <div id="sliderTrack" style="width: 52%;" class="weui-slider__track"></div>
        <div id="sliderHandler" style="left: 52%;" class="weui-slider__handler"></div>
      </div>
    </div>
    <div id="sliderValue" class="weui-slider-box__value">{{ value }}</div>
  </div>
</template>

<script type="text/babel">
// import Vue from 'vue'
// import AlloyFingerVue from 'alloyfinger'

// Vue.use(AlloyFingerVue)
import 'weui/dist/style/weui.min.css'

export default {
  name: 'vui-slider',

  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    disabled: Boolean
  },

  data () {
    return {
      currentValue: 0
    }
  },

  computed: {
    width () {
      return 100
    }
  }
}
</script>

<style scoped lang="scss">
</style>