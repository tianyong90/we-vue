<template>
	<div class="weui-slider-box">
    <div class="weui-slider">
      <div id="sliderInner" class="weui-slider__inner">
        <div id="sliderTrack" style="width: 52%;" class="weui-slider__track"></div>
        <div id="sliderHandler" style="left: 52%;" class="weui-slider__handler"></div>
      </div>
    </div>
    <div id="sliderValue" class="weui-slider-box__value">52</div>
  </div>
</template>

<script type="text/babel">
import 'weui/dist/style/weui.min.css'

export default {
  name: 'vui-slider',

  props: {
    trailColor: {
      type: String,
      default: '#D9D9D9'
    },
    value: {
      type: Number,
      default: 0
    }
  },

  computed: {
  }
}
</script>

<style scoped lang="scss">
</style>