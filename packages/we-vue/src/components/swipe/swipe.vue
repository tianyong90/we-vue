<template>
  <div
    class="wv-swipe"
    @touchstart="onTouchstart"
    @touchmove="onTouchmove"
    @touchend="onTouchend"
    @touchcancel="onTouchend"
  >
    <div
      :style="wrapperStyle"
      class="wv-swipe__wrapper"
      @transitionend="$emit('change', activeIndicator)"
    >
      <slot />
    </div>
    <div class="wv-swipe__indicators" v-if="showIndicators && count > 1">
      <i
        v-for="index in count"
        :key="index"
        :class="{ 'wv-swipe__indicator--active': index - 1 === activeIndicator }"
      />
    </div>
  </div>
</template>

<script>
import swipe from './swipe.vue.ts'
export default swipe
</script>
