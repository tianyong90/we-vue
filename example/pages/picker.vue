<template>
  <div class="page">
    <wv-group>
      <wv-cell title="单列选择器" is-link @click.native="picker1Show = true"></wv-cell>
      <wv-cell title="多列选择器" is-link @click.native="pickerVisible2 = true"></wv-cell>
    </wv-group>

    <wv-picker :show="picker1Show" :slots="slots1" @change="onChange"></wv-picker>
    <wv-picker :show="picker2Show" :slots="slots2"></wv-picker>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pickerValue1: [],
        pickerValue2: [],
        picker1Show: true,
        picker2Show: false,
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

    methods: {
      onChange (picker, value) {
        console.log(picker.getSlotValues(0))

//        picker.setValues(['火车票'])
//        console.log(picker)
//        console.log(value)
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
