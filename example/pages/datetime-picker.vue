<template>
  <div class="page">
    <wv-group>
      <wv-cell title="日期" :value="pickerValue1" is-link @click.native="pickerVisible1 = true"></wv-cell>
      <wv-cell title="时间日期" :value="pickerValue1" is-link @click.native="pickerVisible1 = true"></wv-cell>
      <wv-cell title="时间" :value="pickerValue1" is-link @click.native="pickerVisible2 = true"></wv-cell>
    </wv-group>

    <wv-datetime-picker v-model="pickerVisible1" :slots="slots1"></wv-datetime-picker>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pickerValue1: '',
        pickerVisible1: false,
        slots1: [
          {
            values: [
              '汽车票',
              '飞机票',
              '火车票',
              '轮船票',
              '其它'
            ],
            defaultIndex: 2
          }
        ]
      }
    },

    methods: {}
  }
</script>

<style scoped lang="scss">
</style>
