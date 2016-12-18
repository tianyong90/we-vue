<template>
	<div>
		<div class="weui-cells__title" v-if="title">{{ title }}</div>
		<div class="weui-cells">
			<slot></slot>
		</div>
	</div>
</template>

<script type="text/babel">
import 'weui/dist/style/weui.min.css'

export default {
  name: 'wv-group',

  props: {
    title: String
  }
}
</script>