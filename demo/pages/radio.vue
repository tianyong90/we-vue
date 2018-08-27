<template>
  <wv-radio
    title="title"
    v-model="value"
    :options="options"
    @change="onChange"
  />
</template>

<script>
export default {
  data () {
    return {
      value: 'hello',
      options: [{
        label: '对象值',
        value: {
          name: 'tian'
        }
      },
      {
        label: '字符串值',
        value: 'hello'
      },
      {
        label: '布尔值',
        value: true
      },
      {
        label: '禁用项',
        value: 'value4',
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
