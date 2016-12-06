<template>
  <div>
    <vui-cell-group title="默认">
      <vui-input label="label" placeholder="请输入内容"></vui-input>
    </vui-cell-group>
    <vui-cell-group title="readonly">
      <vui-input label="label" placeholder="请输入内容" :readonly="true" v-model="content"></vui-input>
    </vui-cell-group>
    <vui-cell-group title="默认">
      <vui-input label="label" placeholder="请输入内容"></vui-input>
    </vui-cell-group>
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