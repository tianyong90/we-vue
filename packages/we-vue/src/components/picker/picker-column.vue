<template>
  <div
    class="weui-picker__group"
    @touchstart="onTouchstart"
    @touchmove.prevent="onTouchmove"
    @touchend="onTouchend"
    @touchcancel="onTouchend"
  >
    <div class="weui-picker__mask" :style="pickerMaskStyle" />
    <div
      class="weui-picker__indicator"
      ref="indicator"
      :style="pickerIndicatorStyle"
    />
    <div class="weui-picker__content" :style="wrapperStyle">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="weui-picker__item"
        :class="{ 'weui-picker__item_disabled': isDisabled(option) }"
        v-html="getOptionText(option)"
        @click="setIndex(index, true)"
      />
    </div>
  </div>
</template>

<script>
import pickerColumn from './picker-column.vue.ts'
export default pickerColumn
</script>
