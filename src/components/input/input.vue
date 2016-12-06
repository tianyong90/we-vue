<template>
  <div>
    <div class="weui-cell">
      <div class="weui-cell__hd"><label class="weui-label">{{ label }}</label></div>
      <div class="weui-cell__bd">
        <input class="weui-input" :type="type" :placeholder="placeholder" :readonly="readonly">
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
    readonly: Boolean,
    placeholder: String
  },

  computed: {
  },

  methods: {
  }
}
</script>