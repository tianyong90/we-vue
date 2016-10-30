<template>
	<div>
		<vui-checklist :options="options" v-model="checkedItems"></vui-checklist>
	</div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      options: [
        {
          label: '选项1',
          value: 'value1'
        },
        {
          label: '选项2',
          value: 'value2'
        },
        {
          label: '选项3',
          value: 'value3'
        }
      ]
    }
  },
  mounted () {
    console.log(this.$route)
  }
}
</script>

<style scoped lang="scss">
	.buttons-big {
		display: block;
		width: 80%;
		margin: 0 auto;
	}
	
	.buttons-plain {
		display: block;
		width: 60%;
		margin: 0 auto;
	}
	
	.buttons-mini {
		display: block;
		width: 60%;
		margin: 0 auto;
	}
</style>