<template>
  <div v-show="visible">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
      <i class="weui-icon-success-no-circle weui-icon_toast"></i>
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
    }
  },

  watch: {

  },

  data () {
    return {
      message: ''
    }
  }
}
</script>