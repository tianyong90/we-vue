<template>
  <transition
    enter-active-class="weui-animate-fade-in"
    leave-active-class="weui-animate-fade-out"
  >
    <div
      class="weui-toptips weui-toptips_warn"
      v-show="visible"
      v-html="message"
    />
  </transition>
</template>

<script lang="ts">

import PopupMixin from '../mixins/popup'

import Vue from 'vue'

export default Vue.extend({
  name: 'wv-top-tips',

  mixins: [PopupMixin],

  props: {
    message: String
  }
})
</script>
