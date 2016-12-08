<template>
  <div>
    <vui-cell title="默认">
      <vui-input label="label" placeholder="请输入内容"></vui-input>
      <vui-input label="label" placeholder="请输入内容"></vui-input>
      <vui-input label="label" placeholder="请输入内容"></vui-input>
    </vui-cell>
    <vui-cell title="readonly">
      <vui-input label="label" placeholder="请输入内容" :readonly="true" v-model="content"></vui-input>
    </vui-cell>
    <vui-cell title="默认">
      <vui-input label="label" placeholder="请输入内容"></vui-input>
    </vui-cell>
  </div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      content: 'abc'
    }
  }
}
</script>

<style scoped lang="scss">
</style>