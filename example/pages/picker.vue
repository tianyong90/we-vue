<template>
  <div class="page">
    <wv-group>
      <wv-cell title="单列选择器" :value="pickerValue1" is-link @click.native="showPicker1"></wv-cell>
      <wv-cell title="多列选择器" :value="pickerValue1" is-link @click.native="showPicker1"></wv-cell>
    </wv-group>

    <wv-picker v-model="pickerVisible" :slots="slots"></wv-picker>
  </div>
</template>

<script type="text/babel">
  export default {
    data () {
      return {
        pickerValue1: '',
        pickerVisible: false,
        slots: [
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
      showPicker1 () {
        this.pickerVisible = true
      }
    }
  }
</script>

<style scoped lang="scss">
  .popup-body {
    display: block;
    overflow: hidden;
    background: #fff;
  }
</style>
