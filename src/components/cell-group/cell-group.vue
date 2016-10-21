<template>
	<div>
		<div class="weui-cells__title" v-if="title">{{ title }}</div>
		<div class="weui-cells">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import 'weui/dist/style/weui.min.css'

export default {
  name: 'vui-cell-group',

  props: {
    title: String
  }
}
</script>