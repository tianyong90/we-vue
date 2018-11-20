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
import '../../scss/top-tips.scss'

import Vue from 'vue'
import PopupMixin from '../../mixins/popup'

export default Vue.extend({
  name: 'wv-top-tips',

  mixins: [PopupMixin],

  props: {
    message: {
      type: String,
      require: true
    }
  }
})
</script>
