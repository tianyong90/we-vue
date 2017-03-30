<template>
	<div class="page-with-padding">
		<wv-progress :percent="percent1" :show-clear="false"></wv-progress>
		<wv-progress :percent="percent2"></wv-progress>
		<wv-progress percent="10"></wv-progress>

		<wv-button type="primary" @click.native="upload">上传</wv-button>
	</div>
</template>

<script type="text/babel">
export default {
  mounted () {
  },

  data () {
    return {
      percent1: 35,
      percent2: 0
    }
  },

  methods: {
    upload () {
      let temp = 0

      let ticker = setInterval(() => {
        temp++

        this.percent1 = temp
        this.percent2 = temp

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
