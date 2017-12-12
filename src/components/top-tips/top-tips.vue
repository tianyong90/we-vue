<template>
  <div class="weui-toptips weui-toptips_warn" v-if="visible" v-html="message"></div>
</template>

<script>
  import { create } from '../../utils'

  export default create({
    name: 'wv-top-tips',

    props: {
      visible: Boolean,
      message: String
    }
  })
</script>

<style scoped lang="scss">
  .weui-toptips {
    display: block;
  }
</style>
