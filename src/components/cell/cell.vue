<template>
  <div class="weui-cell weui-cell_access">
    <div class="weui-cell_hd">
      <slot name="icon"></slot>
    </div>
    <div class="weui-cell__bd">
      <p>{{ title }}</p>
    </div>
    <div class="weui-cell__ft">{{ value }}</div>
  </div>
</template>

<script type="text/babel">
import 'weui/dist/style/weui.min.css'

export default {
  name: 'vui-cell',

  props: {
    link: Boolean,
    title: String,
    value: String,
    visible: {
      default: true
    }
  }
}
</script>