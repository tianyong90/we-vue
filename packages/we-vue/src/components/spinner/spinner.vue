<template>
  <i class="weui-loading" :style="style" v-if="type === 'default'" />
  <span v-else class="wv-spinner">
    <i class="iconfont" :class="fontClassName" :style="style" />
  </span>
</template>

<script>
import spinner from './spinner.vue.ts'
export default spinner
</script>
