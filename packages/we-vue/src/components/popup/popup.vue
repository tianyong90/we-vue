<template>
  <transition
    enter-active-class="weui-animate-slide-up"
    leave-active-class="weui-animate-slide-down"
  >
    <div
      class="wv-popup"
      v-show="visible"
      :style="style"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
import popup from './popup.vue.ts'
export default popup
</script>
