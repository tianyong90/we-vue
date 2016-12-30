<template>
	<div>
    <wv-radio title="title" v-model="value" :options="options"></wv-radio>
	</div>
</template>

<script type="text/babel">
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
      },
      {
        label: 'label3',
        value: 'value3',
        disabled: true
      }]
    }
  }
}
</script>

<style scoped lang="scss">
</style>
