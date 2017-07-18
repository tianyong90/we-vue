<template>
  <div class="page page-with-padding">
    <wv-button @click="ticketPickerShow = true">单列选择器</wv-button>
    <wv-button @click="dayPickerShow = true">多列选择器</wv-button>
    <wv-button @click="addressPickerShow = true">多列联动选择器（省市区）</wv-button>

    <wv-picker v-model="ticketPickerShow" :slots="ticketSlots" @change="onChange"></wv-picker>
    <wv-picker v-model="dayPickerShow" :slots="daySlots" @change="onChange"></wv-picker>
    <wv-picker v-model="addressPickerShow" :slots="addressSlots" @change="onAddressChange"></wv-picker>
  </div>
</template>

<script>
  import chinaAreaData from 'china-area-data'

  let provinces = Object.values(chinaAreaData[86])

  // 获取某一省下的市
  function getCities (province) {
    let provinceCode
    for (let i in chinaAreaData[86]) {
      if (province === chinaAreaData[86][i]) {
        provinceCode = i
        break
      }
    }

    return Object.values(chinaAreaData[provinceCode])
  }

  // 获取某一市下的区/县
  function getAreas (province, city) {
    let provinceCode, cityCode
    for (let i in chinaAreaData[86]) {
      if (province === chinaAreaData[86][i]) {
        provinceCode = i
        break
      }
    }

    for (let i in chinaAreaData[provinceCode]) {
      if (city === chinaAreaData[provinceCode][i]) {
        cityCode = i
        break
      }
    }

    if (chinaAreaData[cityCode]) {
      return Object.values(chinaAreaData[cityCode])
    } else {
      // 只有两级的情况，地区列表直接返回市名
      return [city]
    }
  }

  export default {
    data () {
      return {
        ticketValue: [],
        dayValue: [],
        ticketPickerShow: false,
        dayPickerShow: false,
        addressPickerShow: false,
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
        ],
        addressSlots: [
          {
            values: provinces
          },
          {
            values: []
          },
          {
            values: []
          }
        ]
      }
    },

    methods: {
      onChange (picker, value) {
        console.log(value)
      },

      onAddressChange (picker, value) {
        picker.setSlotValues(1, getCities(value[0]))
        picker.setSlotValues(2, getAreas(value[0], value[1]))
      }
    }
  }
</script>

<style scoped lang="scss">
  .page {
    padding-top: 5em;
    background-color: #fff;
  }
</style>
