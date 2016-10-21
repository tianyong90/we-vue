<template>
	<div class="weui-tabbar" v-model="selected">
		<slot></slot>
	</div>
</template>

<script>
import 'weui/dist/style/weui.min.css'

export default {
  name: 'vui-tabbar',

  props: {
  },

  data () {
    return {
      selected: ''
    }
  }
}
</script>