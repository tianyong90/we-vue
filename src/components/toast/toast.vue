<template>
  <div v-if="visible">
    <div class="weui-toast">
      <wv-icon :type="icon" class="weui-icon_toast"></wv-icon>
      <p class="weui-toast__content" v-text="message"></p>
    </div>
  </div>
</template>

<script type="text/babel">
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
