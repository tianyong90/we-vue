<template>
  <div id="loadingToast" v-show="visible">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
      <i class="weui-loading weui-icon_toast"></i>
      <p class="weui-toast__content" v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import 'weui/dist/style/weui.min.css'

export default {
  props: {
    visible: {
      default: false
    }
  },

  data () {
    return {
      message: 'Loading……'
    }
  }
}
</script>