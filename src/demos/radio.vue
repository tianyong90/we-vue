<template>
	<div>
    <vui-radio title="title" v-model="value" :options="options"></vui-radio>
	</div>
</template>

<script>
export default {
  data () {
    return {
      value: 'value2',
      options: [{
        label: 'label1',
        value: 'value1'
      },
      {
        label: 'label2',
        value: 'value2'
      }]
    }
  }
}
</script>

<style scoped lang="scss">
</style>