<template>
  <div class="weui-progress">
    <div class="weui-progress__bar">
      <div class="weui-progress__inner-bar js_progress" :style="{width: percent + '%'}" />
    </div>
    <span v-if="showClear" class="weui-progress__opr">
      <i class="weui-icon-cancel" @click="onClickCancel" />
    </span>
  </div>
</template>

<script>
import progress from './progress.vue.ts'
export default progress
</script>
