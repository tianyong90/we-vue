<template>
  <div class="weui-cells weui-cells_form">
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <textarea class="weui-textarea" :placeholder="placeholder" :rows="row" :disabled="disabled">{{ currentValue }}</textarea>
        <div class="weui-textarea-counter" v-if="showCounter"><span>{{ length }}</span>/{{ maxLength }}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import 'weui/dist/style/weui.min.css'

export default {
  name: 'vui-textarea',

  props: {
    placeholder: String,
    showCounter: {
      type: Boolean,
      default: true
    },
    row: {
      type: Number,
      default: 3
    },
    maxLength: {
      type: Number,
      default: 100
    },
    disabled: Boolean,
    value: String
  },

  data () {
    return {
      currentValue: ''
    }
  },

  computed: {
    length () {
      return this.currentValue.length
    }
  },

  mounted () {
    this.currentValue = this.value
  },

  watch: {
    currentValue (val) {
      this.$emit('input', val)
    },

    value (val) {
      this.currentValue = val
    }
  }
}
</script>