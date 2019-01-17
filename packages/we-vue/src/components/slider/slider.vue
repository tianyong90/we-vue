<template>
  <div class="weui-slider-box">
    <div
      class="weui-slider"
      :class="{ 'wv-slider--disabled': disabled }"
    >
      <div
        class="weui-slider__inner"
        ref="inner"
        @click.prevent="onClick"
      >
        <div
          :style="{ width: percent + '%' }"
          class="weui-slider__track"
        />
        <div
          :style="{left: percent + '%'}"
          class="weui-slider__handler"
          ref="handler"
          @touchstart="onTouchstart"
          @touchmove="onTouchmove"
        />
      </div>
    </div>
    <div class="weui-slider-box__value" v-if="showValue">
      <slot name="value-box">
        {{ value }}
      </slot>
    </div>
  </div>
</template>

<script>
import slider from './slider.vue.ts'
export default slider
</script>
