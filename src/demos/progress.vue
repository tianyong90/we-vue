<template>
	<div class="page-with-padding">
		<vui-progress :percent="percent1" :show-clear="false"></vui-progress>
		<vui-progress :percent="percent2"></vui-progress>
		<vui-progress :percent="percent3"></vui-progress>

		<vui-button type="primary" @click.native="upload">上传</vui-button>
	</div>
</template>

<script type="text/babel">
export default {
  mounted () {
  },

  data () {
    return {
      percent1: 35,
      percent2: 0,
      percent3: 50
    }
  },

  methods: {
    upload () {
      let temp = 0

      let ticker = setInterval(() => {
        temp++

        this.percent1 = temp
        this.percent2 = temp
        this.percent3 = temp

        if (temp >= 100) {
          clearInterval(ticker)
        }
      }, 10)
    }
  }
}
</script>

<style scoped lang="scss">
  .weui-progress {
    height: 50px;
  }
</style>