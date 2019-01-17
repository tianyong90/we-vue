<template>
  <transition
    enter-active-class="weui-animate-fade-in"
    leave-active-class="weui-animate-fade-out"
  >
    <div
      class="weui-toptips weui-toptips_warn"
      v-show="visible"
      v-html="message"
    />
  </transition>
</template>

<script>
import topTips from './top-tips.vue.ts'
export default topTips
</script>
