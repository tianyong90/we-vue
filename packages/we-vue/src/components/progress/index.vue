<template>
  <div class="weui-progress">
    <div class="weui-progress__bar">
      <div class="weui-progress__inner-bar js_progress" :style="{width: percent + '%'}" />
    </div>
    <span v-if="showClear" class="weui-progress__opr">
      <i class="weui-icon-cancel" @click="onCancelClick" />
    </span>
  </div>
</template>

<script lang="ts">
import '../../scss/progress.scss'

import Vue from 'vue'

export default Vue.extend({
  name: 'wv-progress',

  props: {
    percent: {
      type: [Number, String]
    },
    showClear: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    onCancelClick (event) {
      event.preventDefault()
      this.$emit('cancel', this)
    }
  }
})
</script>
