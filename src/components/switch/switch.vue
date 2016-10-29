<template>
  <input class="weui-switch" :disabled="disabled" @change="$emit('change', currentValue)" v-model="currentValue" type="checkbox">
</template>

<script type="text/babel">
import 'weui/dist/style/weui.min.css'

export default {
  name: 'vui-switch',

  props: {
    disabled: Boolean,
    value: Boolean
  },

  data () {
    return {
      currentValue: this.value
    }
  },

  watch: {
    value (val) {
      this.currentValue = val
    },

    currentValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>