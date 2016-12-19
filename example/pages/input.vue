<template>
  <div>
    <wv-group title="默认">
      <wv-input label="label" placeholder="请输入内容" v-model="valueText"></wv-input>
      <wv-input label="label" placeholder="请输入内容" type="number" v-model="valueNumber"></wv-input>
    </wv-group>
    <wv-group title="readonly">
      <wv-input label="label" placeholder="请输入内容" :readonly="true" v-model="valueReadonly"></wv-input>
    </wv-group>
  </div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      valueText: 'hello',
      valueNumber: '110',
      valueReadonly: '内容是只读的'
    }
  }
}
</script>

<style scoped lang="scss">
</style>
