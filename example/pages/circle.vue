<template>
	<div class="page-with-padding">
    <div id="circle-1">
		  <wv-circle :trail-width="3" :stroke-width="3" v-model="percent1">{{ percent1 }}%</wv-circle>
    </div>
    <wv-slider v-model="percent2"></wv-slider>
    <div id="circle-2">
		  <wv-circle :trail-width="3" :stroke-width="3" stroke-color="red" v-model="percent2">{{ percent2 }}%</wv-circle>
    </div>
	</div>
</template>

<script type="text/babel">
  export default {
    data () {
      return {
        percent1: 58,
        percent2: 20
      }
    }
  }
</script>

<style scoped lang="scss">
  #circle-1 {
    display: block;
    width: 100px;
    height: 100px;
    margin: 0 auto 40px;
  }

  #circle-2 {
    display: block;
    width: 150px;
    height: 150px;
    margin: 20px auto;
  }
</style>