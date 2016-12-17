<template>
  <div>
    <vui-group title="默认">
      <vui-input label="label" placeholder="请输入内容" v-model="value1"></vui-input>
      <vui-input label="label" placeholder="请输入内容" v-model="value1"></vui-input>
    </vui-group>
    <vui-group title="readonly">
      <vui-input label="label" placeholder="请输入内容" :readonly="true" v-model="value1"></vui-input>
    </vui-group>
  </div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      value1: 'hello'
    }
  }
}
</script>

<style scoped lang="scss">
</style>
