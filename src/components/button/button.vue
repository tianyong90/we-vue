<template>
  <button
    class="weui-btn"
    :class="classObject"
    :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script type="text/babel">
import 'weui/dist/style/weui.min.css'

export default {
  name: 'vui-button',

  props: {
    type: {
      type: String,
      default: 'default'
    },
    disabled: Boolean,
    mini: Boolean,
    plain: Boolean
  },

  methods: {
    handleClick ($event) {
      $event.preventDefault()
    }
  },

  computed: {
    classObject: function () {
      let classType = this.plain ? `weui-btn_plain-${this.type}` : `weui-btn_${this.type}`
      let classDisabled = this.plain ? 'weui-btn_plain-disabled' : 'weui-btn_disabled'

      return {
        [classType]: true,
        [classDisabled]: this.disabled,
        'weui-btn_mini': this.mini
      }
    }
  }
}
</script>
