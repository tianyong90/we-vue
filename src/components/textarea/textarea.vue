<template>
  <div class="weui-cells weui-cells_form">
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <textarea @change="$emit('change', currentValue)" class="weui-textarea" ref="rextarea" :placeholder="placeholder" :rows="rows" :disabled="disabled" :readonly="readonly" v-model="currentValue"></textarea>
        <div class="weui-textarea-counter" v-if="showCounter"><span>{{ length }}</span>/{{ maxLength }}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'wv-textarea',

  props: {
    placeholder: String,
    showCounter: {
      type: Boolean,
      default: true
    },
    rows: {
      type: Number,
      default: 3
    },
    maxLength: {
      type: Number,
      default: 100
    },
    disabled: Boolean,
    readonly: Boolean,
    value: String
  },

  data () {
    return {
      currentValue: this.value
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
      // 有最大字数限制时对超出限制部分进行截取
      if (this.maxLength && this.value.length > this.maxLength) {
        val = val.slice(0, this.maxLength)
      }

      this.currentValue = val
    }
  }
}
</script>
