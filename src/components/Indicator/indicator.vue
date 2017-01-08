<template>
  <div id="loadingToast" v-show="visible">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
      <i class="weui-loading weui-icon_toast"></i>
      <p class="weui-toast__content">{{ text }}</p>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  props: {
    text: String
  },

  data () {
    return {
      visible: false
    }
  }
}
</script>
