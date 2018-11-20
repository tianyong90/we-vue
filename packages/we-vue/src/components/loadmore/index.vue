<template>
  <div
    class="weui-loadmore"
    :class="{'weui-loadmore_line': (type === 'line' || type === 'lineDot'), 'weui-loadmore_dot': type === 'lineDot' }"
  >
    <wv-spinner type="default" v-if="type === 'default'"/>
    <span class="weui-loadmore__tips" v-text="type === 'lineDot' ? '' : text"/>
  </div>
</template>

<script lang="ts">
import '../../scss/loadmore.scss'

import Themeable from '../../mixins/themeable'

import mixins from '../../utils/mixins'

import Spinner from '../spinner'

export default mixins(
  Themeable
  /* @vue/component */
).extend({
  name: 'wv-loadmore',

  components: {
    'wv-spinner': Spinner
  },

  props: {
    type: {
      type: String,
      default: 'default'
    },
    text: {
      type: String,
      default: '正在加载'
    }
  }
})
</script>
