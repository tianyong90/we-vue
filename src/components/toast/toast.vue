<template>
  <div v-show="visible">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
      <wv-icon :type="icon" class="weui-icon_toast"></wv-icon>
      <p class="weui-toast__content">{{ message }}</p>
    </div>
  </div>
</template>

<script type="text/babel">
import 'weui/dist/style/weui.min.css'

export default {
  props: {
    visible: {
      default: true
    },
    icon: {
      type: String,
      default: 'success-no-circle'
    },
    message: String
  }
}
</script>

<style scoped lang="scss">
  .weui-icon_toast {
    font-size: 40px;
  }
</style>
