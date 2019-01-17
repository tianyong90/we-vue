<template>
  <cell :title="title" v-if="isInCell">
    <wv-switch
      :is-in-cell="false"
      slot="ft"
      v-model="currentValue"
      :disabled="disabled"
    />
  </cell>

  <div
    class="wv-switch"
    :class="{ 'wv-switch-on': currentValue, 'wv-switch-disabled': disabled }"
    @click="onClick"
    v-else
  >
    <div class="background" />
    <div
      class="thumb"
      :style="thumbStyle"
      @touchstart="onTouchstart"
      @touchmove="onTouchmove"
      @touchend="onTouchend"
      @touchcancel="onTouchend"
    />
  </div>
</template>

<script>
import wvSwitch from './switch.vue.ts'
export default wvSwitch
</script>
