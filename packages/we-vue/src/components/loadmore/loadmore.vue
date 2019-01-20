<template>
  <div
    class="weui-loadmore"
    :class="{'weui-loadmore_line': (type === 'line' || type === 'lineDot'), 'weui-loadmore_dot': type === 'lineDot' }"
  >
    <WVSpinner type="default" v-if="type === 'default'" />
    <span class="weui-loadmore__tips" v-text="type === 'lineDot' ? '' : text" />
  </div>
</template>

<script>
import loadmore from './loadmore.vue.ts'
export default loadmore
</script>
