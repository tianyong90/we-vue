<template>
  <WVCell :title="title" v-if="isInCell">
    <wv-switch
      :is-in-cell="false"
      slot="ft"
      v-model="isActive"
      :disabled="disabled"
    />
  </WVCell>

  <div
    class="wv-switch"
    :class="{ 'wv-switch-on': isActive, 'wv-switch-disabled': disabled }"
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
