<template>
  <div class="page">
    <w-group title="选择器示例">
      <w-cell
        title="单列(对象数组)"
        is-link
        :value="fruit | fruitValueFilter"
        @click.native="fruitPickerShow = true"
      />
      <w-cell
        title="单列"
        is-link
        :value="ticket | pickerValueFilter"
        @click.native="ticketPickerShow = true"
      />
      <w-cell
        title="多列"
        is-link
        :value="dayValue | pickerValueFilter"
        @click.native="dayPickerShow = true"
      />
    </w-group>

    <w-picker
      :visible.sync="fruitPickerShow"
      :columns="fruitColumns"
      value-key="name"
      v-model="fruit"
    />
    <w-picker
      :visible.sync="ticketPickerShow"
      v-model="ticket"
      :columns="ticketColumns"
      @confirm="confirmTicket"
    />
    <w-picker
      :visible.sync="dayPickerShow"
      :columns="dayColumns"
      v-model="dayValue"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      fruitPickerShow: false,
      ticketPickerShow: false,
      dayPickerShow: false,
      fruit: [{ name: 'Banana', price: 2.0 }],
      ticket: ['汽车票'],
      dayValue: ['星期二', '下午'],
      fruitColumns: [
        {
          options: [
            {
              name: 'Apple',
              price: 1.3,
            },
            {
              name: 'Banana',
              price: 2.0,
            },
            {
              name: 'Orange',
              price: 10,
            },
            {
              name: 'Pear',
              price: 0.5,
            },
          ],
        },
      ],
      ticketColumns: [
        {
          options: ['汽车票', '飞机票', '火车票', '轮船票', '其它'],
          defaultIndex: 2,
        },
      ],
      dayColumns: [
        {
          options: [
            '星期一',
            '星期二',
            '星期三',
            '星期四',
            '星期五',
            '星期六',
            '星期日',
          ],
        },
        {
          options: ['上午', '下午'],
        },
      ],
    }
  },

  mounted () {},

  methods: {
    onChange (picker, value) {
      console.log(value)
    },

    confirmTicket (picker) {
      this.ticket = picker.getValues()
    },
  },

  filters: {
    fruitValueFilter (val) {
      return val[0].name
    },

    pickerValueFilter (val) {
      if (Array.isArray(val)) {
        return val.toString()
      } else {
        return '请选择'
      }
    },
  },
}
</script>
