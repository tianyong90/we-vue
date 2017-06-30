<template>
  <div class="page page-with-padding">
    <wv-button @click="ticketPickerShow = true">单列选择器</wv-button>
    <wv-button @click="dayPickerShow = true">多列选择器</wv-button>


    <wv-picker v-model="ticketPickerShow" :slots="ticketSlots" @change="onChange"></wv-picker>
    <wv-picker v-model="dayPickerShow" :slots="daySlots" @change="onChange"></wv-picker>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        ticketValue: [],
        dayValue: [],
        ticketPickerShow: false,
        dayPickerShow: false,
        ticketSlots: [
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
        daySlots: [
          {
            values: [
              '星期一',
              '星期二',
              '星期三',
              '星期四',
              '星期五'
            ],
            defaultIndex: 0
          },
          {
            values: [
              '上午',
              '下午'
            ],
            defaultIndex: 0
          }
        ]
      }
    },

    methods: {
      onChange (picker, value) {
//        picker.setValues(['飞机票'])
//        console.log(picker.getValues())

//        this.$nextTick(() => {
//          console.log(picker.getSlotValue(0))
//        })

        this.$nextTick(() => {
          console.log(picker.getValues())
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .page {
    background-color: #fff;
  }
</style>
