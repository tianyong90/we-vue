<template>
	<div class="page-with-padding">
		<div class="buttons-big">
			<wv-button type="primary">页面主要操作 Normal</wv-button>
			<wv-button type="primary" :disabled="true">页面主要操作 Disabled</wv-button>
			<wv-button type="default">页面次要操作 Normal</wv-button>
			<wv-button type="default" :disabled="true">页面次要操作 Disabled</wv-button>
			<wv-button type="warn">警告类操作 Normal</wv-button>
			<wv-button type="warn" :disabled="true">警告类操作 Disabled</wv-button>
		</div>

		<div class="buttons-plain">
			<wv-button type="default" :plain="true">按钮</wv-button>
			<wv-button type="default" :plain="true" :disabled="true">按钮</wv-button>
			<wv-button type="primary" :plain="true">按钮</wv-button>
			<wv-button type="primary" :plain="true" :disabled="true">按钮</wv-button>
		</div>

		<div class="buttons-mini">
			<wv-button type="primary" :mini="true">按钮</wv-button>
			<wv-button type="default" :mini="true">按钮</wv-button>
			<wv-button type="warn" :mini="true">按钮</wv-button>
		</div>
	</div>
</template>

<script type="text/babel">
export default {
  mounted () {
  }
}
</script>

<style scoped lang="scss">
	.buttons-big {
		display: block;
		margin: 10px auto;
	}
	
	.buttons-plain {
		display: block;
		width: 60%;
		margin: 10px auto;
	}
	
	.buttons-mini {
		display: block;
		width: 60%;
		margin: 10px auto;
	}
</style>
