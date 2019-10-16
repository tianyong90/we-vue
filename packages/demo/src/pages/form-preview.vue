<template>
  <div class="page">
    <w-form-preview
      class="preview-item"
      title="订单详情"
      value="100.00"
      :data-items="dataItems"
      :buttons="buttons1"
    />
    <w-form-preview
      class="preview-item"
      title="订单详情"
      value="100.00"
      :data-items="dataItems"
      :buttons="buttons2"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataItems: [
        {
          label: '商品',
          value: '电动打蛋机',
        },
        {
          label: '标题标题',
          value: '名字名字名字',
        },
        {
          label: '标题标题',
          value:
            '很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字',
        },
      ],
      buttons1: [
        {
          text: '操作',
          type: 'primary',
          action: function () {
            console.log('执行主要操作……')
          },
        },
      ],
      buttons2: [
        {
          text: '辅助操作',
          type: 'default',
          action: function () {
            console.log('执行辅助操作……')
          },
        },
        {
          text: '操作',
          type: 'primary',
          action: function () {
            console.log('执行主要操作……')
          },
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
.preview-item {
  margin-bottom: 20px;
}
</style>
