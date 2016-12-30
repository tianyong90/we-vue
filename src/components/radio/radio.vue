<template>
	<div>
		<div v-if="title" class="weui-cells__title">{{ title }}</div>
		<div class="weui-cells weui-cells_radio">
			<label v-for="(option, index) in options" class="weui-cell weui-check__label">
        <div class="weui-cell__bd">
            <p>{{ option.label || option }}</p>
        </div>
        <div class="weui-cell__ft">
            <input type="radio" class="weui-check" v-model="currentValue" :disabled="option.disabled" :value="option.value || option">
            <span class="weui-icon-checked"></span>
        </div>
      </label>
		</div>
	</div>
</template>

<script type="text/babel">
import 'weui/dist/style/weui.min.css'

export default {
  name: 'wv-radio',

  props: {
    title: String,
    align: {
      type: String,
      default: 'left'
    },
    options: Array,
    value: String
  },

  data () {
    return {
      currentValue: this.value
    }
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
