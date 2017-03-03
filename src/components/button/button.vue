<template>
  <button
    class="weui-btn"
    :class="classObject"
    :disabled="disabled">
    <i class="weui-loading" v-if="isLoading"></i>
    <slot></slot>
  </button>
</template>

<script type="text/babel">
export default {
  name: 'wv-button',

  props: {
    type: {
      type: String,
      default: 'default'
    },
    isLoading: Boolean,
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
        'weui-btn_loading': this.isLoading,
        'weui-btn_mini': this.mini
      }
    }
  }
}
</script>
