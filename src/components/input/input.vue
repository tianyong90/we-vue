<template>
  <div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">{{ label }}</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" :type="type" :placeholder="placeholder">
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import 'weui/dist/style/weui.min.css'

export default {
  name: 'vui-input',

  props: {
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    value: String,
    disabled: Boolean,
    readonly: Boolean,
    placeholder: String
  },

  computed: {
  },

  methods: {
  }
}
</script>