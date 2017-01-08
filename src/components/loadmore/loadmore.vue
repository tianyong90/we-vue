<template>
	<div class="weui-loadmore"
    :class="{'weui-loadmore_line': (type === 'line' || type === 'lineDot'), 'weui-loadmore_dot': type === 'lineDot' }">
    <i class="weui-loading" v-if="type === 'default'"></i>
    <span class="weui-loadmore__tips" v-text="type === 'lineDot' ? '' : text"></span>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'wv-loadmore',

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
}
</script>
