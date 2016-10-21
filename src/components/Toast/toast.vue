<template>
  <div id="toast" v-show="visible">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
      <i class="weui-icon-success-no-circle weui-icon_toast"></i>
      <p class="weui-toast__content">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import 'weui/dist/style/weui.min.css'

export default {
  props: {
    visible: {
      default: true
    }
  },

  data () {
    return {
      message: ''
    }
  }
}
</script>