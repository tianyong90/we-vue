<template>
  <transition enter-active-class="weui-animate-fade-in" leave-active-class="weui-animate-fade-out">
    <div class="weui-toptips weui-toptips_warn" v-show="visible" v-html="message" />
  </transition>
</template>

<script>
import { create } from '../utils'
import PopupMixin from '../mixins/popup'

export default create({
  name: 'top-tips',

  mixins: [PopupMixin],

  props: {
    message: String
  }
})
</script>

<style scoped lang="scss">
  .weui-toptips {
    display: block;
  }
</style>
