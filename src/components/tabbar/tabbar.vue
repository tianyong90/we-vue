<template>
	<div class="weui-tabbar" :style="{ position: fixed ? 'fixed' : 'absolute' }">
		<slot></slot>
	</div>
</template>

<script type="text/babel">
import 'weui/dist/style/weui.min.css'

export default {
  name: 'wv-tabbar',

  props: {
    fixed: Boolean
  }
}
</script>
