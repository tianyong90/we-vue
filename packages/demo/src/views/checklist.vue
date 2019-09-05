<template>
  <div>
    <w-checklist
      title="基本示例"
      :options="options"
      v-model="checkedItems1"
      @change="onChange"
    />

    <w-checklist
      title="限制最多选定项数为 2"
      :options="options"
      v-model="checkedItems2"
      :max="2"
      @change="onChange"
    />

    <w-checklist
      title="右对齐"
      align="right"
      :options="options"
      v-model="checkedItems3"
      @change="onChange"
    />

    <w-checklist
      title="自定义颜色"
      align="right"
      checked-color="#fa5151"
      :options="options"
      v-model="checkedItems4"
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
          value: 'value1',
        },
        {
          label: '选项2',
          value: 'value2',
        },
        {
          label: '选项3',
          value: 'value3',
        },
        {
          label: '选项4（禁用）',
          value: 'value4',
          disabled: true,
        },
      ],
      checkedItems1: ['value1'],
      checkedItems2: ['value1', 'value2'],
      checkedItems3: [],
      checkedItems4: ['value1'],
    }
  },

  methods: {
    onChange (val) {
      console.log(val)
    },
  },
}
</script>
