<template>
  <div
    class="weui-cell"
    :class="{'weui-cell_access': isLink}"
    @click="onClick"
  >
    <div class="weui-cell_hd">
      <slot name="icon" />
    </div>
    <div class="weui-cell__bd">
      <slot name="bd">
        <p v-html="title" />
      </slot>
    </div>
    <div class="weui-cell__ft">
      <slot name="ft">
        {{ value }}
      </slot>
    </div>
  </div>
</template>

<script>
import badge from './cell.vue.ts'
export default badge
</script>
