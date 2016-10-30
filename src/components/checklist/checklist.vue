<template>
  <div>
    <div class="weui-cells__title">复选列表项</div>
    <div class="weui-cells weui-cells_checkbox">
        <label v-for="option in options" class="weui-cell weui-check__label" for="s11">
            <div class="weui-cell__hd">
                <input type="checkbox" class="weui-check" v-model="currentValue" :disabled="option.disabled" :value="option.value || option" id="s11">
                <i class="weui-icon-checked"></i>
            </div>
            <div class="weui-cell__bd">
                <p>{{ option.label || option }}</p>
            </div>
        </label>
        <a href="javascript:void(0);" class="weui-cell weui-cell_link">
            <div class="weui-cell__bd">添加更多</div>
        </a>
    </div>
  </div>
</template>

<script type="text/babel">
import 'weui/dist/style/weui.min.css'

export default {
  name: 'vui-checklist',

  props: {
    max: Number,
    title: String,
    align: String,
    options: {
      type: Array,
      required: true
    },
    value: Array
  },

  data () {
    return {
      currentValue: this.value
    }
  },

  computed: {
    limit () {
      return this.max < this.currentValue.length
    }
  },

  watch: {
    value (val) {
      this.currentValue = val
    },

    currentValue (val) {
      if (this.limit) val.pop()
      this.$emit('input', val)
    }
  }
}
</script>