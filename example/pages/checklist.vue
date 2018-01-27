<template>
  <div>
    <wv-checklist
      title="基本示例"
      :options="options"
      v-model="checkedItems1"
      @change="onChange"
    />

    <wv-checklist
      title="限制最多选两个"
      :options="options"
      v-model="checkedItems2"
      :max="2"
      @change="onChange"
    />
  </div>
</template>

<script>
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
        },
        {
          label: '选项4（禁用）',
          value: 'value4',
          disabled: true
        }
      ],
      checkedItems1: ['value1'],
      checkedItems2: ['value1', 'value3']
    }
  },

  methods: {
    onChange (val) {
      console.log(val)
    }
  }
}
</script>
