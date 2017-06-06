<template>
  <div class="page">
    <wv-group>
      <wv-cell title="单列选择器" :value="pickerValue1" is-link @click.native="pickerVisible1 = true"></wv-cell>
      <wv-cell title="多列选择器" :value="pickerValue1" is-link @click.native="pickerVisible2 = true"></wv-cell>
    </wv-group>

    <wv-picker v-model="pickerVisible1" :slots="slots1"></wv-picker>
    <wv-picker v-model="pickerVisible2" :slots="slots2"></wv-picker>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pickerValue1: '',
        pickerValue2: '',
        pickerVisible1: false,
        pickerVisible2: false,
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
        ],
        slots2: [
          {
            values: [
              '汽车票',
              '飞机票',
              '火车票',
              '轮船票',
              '其它'
            ],
            defaultIndex: 2
          },
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
