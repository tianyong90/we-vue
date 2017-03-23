<template>
	<div class="weui-flex__item" :style="style">
		<slot></slot>
	</div>
</template>

<script type="text/babel">
  export default {
    name: 'wv-flex-item',

    props: {
      flex: {
        type: Number,
        default: 1
      }
    },

    computed: {
      gutter () {
        return this.$parent.gutter
      },

      style () {
        var ret = {}

        if (this.gutter) {
          ret.paddingLeft = this.gutter / 2 + 'px'
          ret.paddingRight = ret.paddingLeft
        }

        ret.flex = this.flex

        return ret
      }
    }
  }
</script>
