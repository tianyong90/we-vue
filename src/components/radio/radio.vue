<template>
	<div>
		<div v-if="title" class="weui-cells__title">{{ title }}</div>
		<div class="weui-cells weui-cells_radio">
			<label v-for="(option, index) in options" class="weui-cell weui-check__label">
        <div class="weui-cell__bd">
            <p>{{ option.label || option }}</p>
        </div>
        <div class="weui-cell__ft">
            <input type="radio" class="weui-check" v-model="value" :disabled="option.disabled" :value="option.value || option">
            <span class="weui-icon-checked"></span>
        </div>
    </label>
			<a href="javascript:void(0);" class="weui-cell weui-cell_link">
				<div class="weui-cell__bd">添加更多</div>
			</a>
		</div>
	</div>
</template>

<script>
import 'weui/dist/style/weui.min.css'

export default {
  name: 'vui-radio',

  props: {
    title: String,
    align: {
      type: String,
      default: 'left'
    },
    options: Array,
    value: String
  }
}
</script>