<template>
  <div>
    <vui-group title="默认">
      <vui-input label="text 类型" placeholder="请输入内容" v-model="valueText"></vui-input>
      <vui-input label="number 类型" placeholder="请输入内容" type="number" v-model="valueNumber"></vui-input>
    </vui-group>
    <vui-group title="readonly">
      <vui-input label="label" placeholder="请输入内容" :readonly="true" v-model="valueReadonly"></vui-input>
    </vui-group>
  </div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      valueText: 'hello',
      valueNumber: '1',
      valueReadonly: '内容是只读的'

    }
  }
}
</script>

<style scoped lang="scss">
</style>
