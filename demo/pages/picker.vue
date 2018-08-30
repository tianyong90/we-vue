<template>
  <div class="page">
    <wv-group title="选择器示例">
      <wv-cell title="单列(对象数组)" is-link :value="fruit.name" @click.native="fruitPickerShow = true" />
      <wv-cell title="单列" is-link :value="ticket | pickerValueFilter" @click.native="ticketPickerShow = true" />
      <wv-cell title="多列" is-link :value="dayAndTime | pickerValueFilter" @click.native="dayPickerShow = true" />
      <wv-cell title="联动" is-link :value="address | pickerValueFilter" @click.native="addressPickerShow = true" />
    </wv-group>

    <wv-picker
      :visible.sync="fruitPickerShow"
      :columns="fruitColumns"
      value-key="name"
      @confirm="confirmPerson"
    />
    <wv-picker
      :visible.sync="ticketPickerShow"
      v-model="ticket"
      :columns="ticketColumns"
      @confirm="confirmTicket"
    />
    <wv-picker
      :visible.sync="dayPickerShow"
      :columns="dayColumns"
      @confirm="confirmDayTime"
    />
    <wv-picker
      :visible.sync="addressPickerShow"
      v-model="address"
      ref="addressPicker"
      :columns="addressColumns"
      :visible-item-count="5"
      @change="onAddressChange"
      @confirm="confirmAddress"
    />
  </div>
</template>

<script>
import chinaAreaData from 'china-area-data'

const provinces = Object.values(chinaAreaData[86])

// 获取某一省下的市
const getCities = (province) => {
  let provinceCode
  for (let i in chinaAreaData[86]) {
    if (province === chinaAreaData[86][i]) {
      provinceCode = i
      break
    }
  }
  return typeof chinaAreaData[provinceCode] === 'object' ? Object.values(chinaAreaData[provinceCode]) : []
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
    return typeof chinaAreaData[cityCode] === 'object' ? Object.values(chinaAreaData[cityCode]) : []
  } else {
    // 只有两级的情况
    return []
  }
}

export default {
  data () {
    return {
      ticketValue: [],
      dayValue: [],
      fruitPickerShow: false,
      ticketPickerShow: false,
      dayPickerShow: false,
      addressPickerShow: false,
      ticket: ['汽车票'],
      dayAndTime: [],
      address: [],
      fruit: [{ name: 'Apple', age: 1 }],
      fruitColumns: [
        {
          values: [
            {
              name: 'Apple',
              price: 1.3
            },
            {
              name: 'Banana',
              price: 2.0
            },
            {
              name: 'Orange',
              price: 10
            },
            {
              name: 'Pear',
              price: 0.5
            }
          ]
        }
      ],
      ticketColumns: [
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
      dayColumns: [
        {
          values: [
            '星期一',
            '星期二',
            '星期三',
            '星期四',
            '星期五',
            '星期六',
            '星期日'
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
      addressColumns: [
        {
          values: provinces
        },
        {
          values: getCities('湖北省')
        },
        {
          values: getAreas('湖北省', '宜昌市')
        }
      ]
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.$refs.addressPicker.setValues(['湖北省', '宜昌市', '长阳土家族自治县'])
    })
  },

  methods: {
    onChange (picker, value) {
      console.log(value)
    },

    confirmPerson (picker) {
      this.fruit = picker.getValues()[0]
    },

    confirmTicket (picker) {
      this.ticket = picker.getValues()
    },

    confirmDayTime (picker) {
      this.dayAndTime = picker.getValues()
    },

    onAddressChange (picker, addressValues, slotIndex) {
      if (slotIndex === 0) {
        const cities = getCities(addressValues[0])
        picker.setColumnValues(1, cities)
        picker.setColumnValues(2, getAreas(addressValues[0], cities[0]))
      } else if (slotIndex === 1) {
        picker.setColumnValues(2, getAreas(addressValues[0], addressValues[1]))
      }
    },

    confirmAddress (picker) {
      this.address = picker.getValues()
    }
  },

  filters: {
    pickerValueFilter (val) {
      if (Array.isArray(val)) {
        return val.toString()
      } else {
        return '请选择'
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
