<template>
  <div v-show="visible">
    <div class="weui-toast">
      <template v-if="spinner !== 'none'">
        <i class="weui-loading weui-icon_toast"></i>
      </template>
      <p class="weui-toast__content" v-text="text"></p>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  props: {
    spinner: {
      type: String,
      default: 'default'
    },
    text: String
  },

  data () {
    return {
      visible: false
    }
  }
}
</script>
