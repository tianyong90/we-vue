<template>
  <div
    class="weui-loadmore"
    :class="{'weui-loadmore_line': (type === 'line' || type === 'lineDot'), 'weui-loadmore_dot': type === 'lineDot' }"
  >
    <WVSpinner type="default" v-if="type === 'default'" />
    <span class="weui-loadmore__tips" v-text="type === 'lineDot' ? '' : text" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import '../../scss/loadmore.scss'

import WVSpinner from '../spinner'

export default Vue.extend({
  name: 'wv-loadmore',

  components: {
    WVSpinner,
  },

  props: {
    type: {
      type: String,
      default: 'default',
    },
    text: {
      type: String,
      default: '正在加载',
    },
  },
})
</script>
