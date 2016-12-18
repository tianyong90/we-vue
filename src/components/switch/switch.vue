<template>
  <div class="weui-cell weui-cell_switch">
    <div class="weui-cell__bd">标题文字</div>
    <div class="weui-cell__ft">
      <input class="weui-switch" type="checkbox">
    </div>
  </div>
  <!--<input class="weui-switch" :disabled="disabled" @change="$emit('change', currentValue)" v-model="currentValue" type="checkbox">-->
</template>

<script type="text/babel">
import 'weui/dist/style/weui.min.css'

export default {
  name: 'wv-switch',

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