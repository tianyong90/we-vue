<template>
	<div>
		<vui-circle :trail-width="2" :stroke-width="2" :percent="percent"></vui-circle>
	</div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      percent: 58
    }
  }
}
</script>

<style scoped lang="scss">

</style>