<template>
	<div>
		<vui-checklist title="基本示例" :options="options" v-model="checkedItems"></vui-checklist>
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
      ],
      checkedItems: ['value1']
    }
  }
}
</script>

<style scoped lang="scss">

</style>