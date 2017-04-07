<template>
  <div class="weui-toptips weui-toptips_warn" v-if="visible" v-html="message"></div>
</template>

<script type="text/babel">
  export default {
    props: {
      visible: {
        type: Boolean,
        default: true
      },
      message: String
    }
  }
</script>

<style scoped lang="scss">
  .weui-toptips {
    display: block;
  }
</style>
