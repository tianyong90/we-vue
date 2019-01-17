<template>
  <transition
    enter-active-class="weui-animate-fade-in"
    leave-active-class="weui-animate-fade-out"
  >
    <div
      :class="{ 'weui-toast_text': type === 'text' }"
      class="weui-toast"
      ref="toast"
      v-show="visible"
    >
      <wv-icon
        :type="icon"
        class="weui-icon_toast"
        v-if="type !== 'text' && type !== 'loading'"
      />
      <wv-spinner
        :size="25"
        :type="spinnerType"
        class="weui-icon_toast"
        v-if="type === 'loading' && spinnerType !=='none'"
      />
      <p class="weui-toast__content" v-text="message" />
    </div>
  </transition>
</template>

<script>
import toast from './toast.vue.ts'
export default toast
</script>
