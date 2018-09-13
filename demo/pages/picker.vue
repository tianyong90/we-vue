<template>
  <div class="page">
    <wv-group title="选择器示例">
      <wv-cell title="单列(对象数组)" is-link :value="fruit.name" @click.native="fruitPickerShow = true" />
      <wv-cell title="单列" is-link :value="ticket | pickerValueFilter" @click.native="ticketPickerShow = true" />
      <wv-cell title="多列" is-link :value="dayAndTime | pickerValueFilter" @click.native="dayPickerShow = true" />
      <wv-cell title="地址联动" is-link :value="address | pickerValueFilter" @click.native="addressPickerShow = true" />
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
import pca from '../assets/data/pca'

const provinces = Object.keys(pca)

// 获取某一省下的市
const getCities = (province) => {
  return Object.keys(pca[province])
}

// 获取某一市下的区/县
function getAreas (province, city) {
  return Object.values(pca[province][city])
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
