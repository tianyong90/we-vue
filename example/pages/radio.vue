<template>
  <div>
    <wv-radio title="title" v-model="value" :options="options" @change="onChange"></wv-radio>
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
          },
          {
            label: 'label3 (disabled)',
            value: 'value3',
            disabled: true
          }]
      }
    },

    methods: {
      onChange (val) {
        console.log(val)
      }
    }
  }
</script>
