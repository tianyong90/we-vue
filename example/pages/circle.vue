<template>
	<div>
    <div id="circle-1">
		  <wv-circle :trail-width="3" :stroke-width="3" :percent="percent1">{{ percent1 }}%</wv-circle>
    </div>
    <div id="circle-2">
		  <wv-circle :trail-width="3" :stroke-width="3" :percent="percent2">{{ percent2 }}%</wv-circle>
    </div>
	</div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      percent1: 58,
      percent2: 0
    }
  },

  mounted () {
    setInterval(() => {
      // 第二个进度百分比随机赋值
      this.percent2 = parseInt(Math.random() * 100)
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
#circle-1 {
  display: block;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

#circle-2 {
  display: block;
  width: 200px;
  height: 200px;
  margin: 3rem auto;
}
</style>