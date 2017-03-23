<template>
	<div class="weui-flex" :style="style">
		<slot></slot>
	</div>
</template>

<script type="text/babel">
export default {
  name: 'wv-flex',

  props: {
    gutter: {
      type: Number,
      default: 0
    }
  },

  computed: {
    style () {
      let result = {}

      if (this.gutter) {
        const margin = `-${this.gutter / 2}px`

        result.marginLeft = margin
        result.marginRight = margin
      }

      return result
    }
  }
}
</script>
