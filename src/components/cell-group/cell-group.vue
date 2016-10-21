<template>
  <div class="weui-cells">
    <slot></slot>
  </div>
</template>

<script>
import 'weui/dist/style/weui.min.css'

export default {
  name: 'vui-cell-group',

  props: {
    visible: {
      default: true
    }
  }
}
</script>