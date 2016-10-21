<template>
  <input
  class="weui-switch"
  :disabled="disabled"
  v-model="value"
  type="checkbox">
</template>

<script>
import 'weui/dist/style/weui.min.css'

export default {
  name: 'vui-switch',

  props: {
    disabled: Boolean,
    value: Boolean
  }
}
</script>