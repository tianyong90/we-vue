<template>
  <wv-picker
    ref="picker"
    :visible.sync="visible"
    :slots="dateSlots"
    @change="onChange"
    @confirm="onConfirm"
    @cancel="onCancel"
    :confirm-text="confirmText"
    :cancel-text="cancelText"
    :visible-item-count="visibleItemCount"
  />
</template>

<script>
import { create } from '../../utils'
import WvPicker from '../picker'

const FORMAT_MAP = {
  Y: 'year',
  M: 'month',
  D: 'date',
  H: 'hour',
  m: 'minute'
}

export default create({
  name: 'wv-datetime-picker',

  components: {
    WvPicker
  },

  props: {
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    type: {
      type: String,
      default: 'datetime'
    },
    startDate: {
      type: Date,
      default () {
        return new Date(new Date().getFullYear() - 10, 0, 1)
      }
    },
    endDate: {
      type: Date,
      default () {
        return new Date(new Date().getFullYear() + 10, 11, 31)
      }
    },
    startHour: {
      type: Number,
      default: 0
    },
    endHour: {
      type: Number,
      default: 23
    },
    yearFormat: {
      type: String,
      default: '{value}'
    },
    monthFormat: {
      type: String,
      default: '{value}'
    },
    dateFormat: {
      type: String,
      default: '{value}'
    },
    hourFormat: {
      type: String,
      default: '{value}'
    },
    minuteFormat: {
      type: String,
      default: '{value}'
    },
    visibleItemCount: {
      type: Number,
      default: 7
    },
    value: {}
  },

  data () {
    return {
      visible: false,
      currentValue: null,
      startYear: null,
      endYear: null,
      startMonth: 1,
      endMonth: 12,
      startDay: 1,
      endDay: 31,
      selfTriggered: false
    }
  },

  computed: {
    ranges () {
      if (this.type === 'time') {
        return {
          hour: [this.startHour, this.endHour],
          min: [0, 59]
        }
      }
      let result
      result = {
        year: [this.startDate.getFullYear(), this.endDate.getFullYear()],
        month: [1, 12],
        date: [1, this.getMonthEndDay(this.getYear(this.currentValue), this.getMonth(this.currentValue))],
        hour: [0, 23],
        min: [0, 59]
      }
      this.rangeDetect(result, 'start')
      this.rangeDetect(result, 'end')
      return result
    },

    typeStr () {
      if (this.type === 'time') {
        return 'Hm'
      } else if (this.type === 'date') {
        return 'YMD'
      } else {
        return 'YMDHm'
      }
    },

    dateSlots () {
      console.log(this.ranges)

      const results = this.ranges.map(range => {
        const values = this.times(range[1] - range[0] + 1, index => {
          const value = range[0] + index
          return value < 10 ? `0${value}` : `${value}`
        })

        return {
          values
        }
      })
      return results

      // let dateSlots = []
      // const INTERVAL_MAP = {
      //   Y: this.ranges.year,
      //   M: this.ranges.month,
      //   D: this.ranges.date,
      //   H: this.ranges.hour,
      //   m: this.ranges.min
      // }
      // const typesArr = this.typeStr.split('')
      // typesArr.forEach(type => {
      //   if (INTERVAL_MAP[type]) {
      //     this.pushSlots.apply(null, [dateSlots, type].concat(INTERVAL_MAP[type]))
      //   }
      // })
      // if (/Hm$/.test(this.typeStr)) {
      //   dateSlots.splice(typesArr.length - 1, 0, {
      //     divider: true,
      //     content: ':'
      //   })
      // }
      // return dateSlots
    }
  },

  methods: {
    open () {
      this.visible = true
    },

    close () {
      this.visible = false
    },

    isLeapYear (year) {
      return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0)
    },

    isShortMonth (month) {
      return [4, 6, 9, 11].indexOf(month) > -1
    },

    getMonthEndDay (year, month) {
      if (this.isShortMonth(month)) {
        return 30
      } else if (month === 2) {
        return this.isLeapYear(year) ? 29 : 28
      } else {
        return 31
      }
    },

    getTrueValue (formattedValue) {
      if (!formattedValue) return
      while (isNaN(parseInt(formattedValue, 10))) {
        formattedValue = formattedValue.slice(1)
      }
      return parseInt(formattedValue, 10)
    },

    getValue (values) {
      let value
      if (this.type === 'time') {
        value = values.map(value => ('0' + this.getTrueValue(value)).slice(-2)).join(':')
      } else {
        let year = this.getTrueValue(values[0])
        let month = this.getTrueValue(values[1])
        let date = this.getTrueValue(values[2])
        let maxDate = this.getMonthEndDay(year, month)
        if (date > maxDate) {
          this.selfTriggered = true
          date = 1
        }
        let hour = this.typeStr.indexOf('H') > -1 ? this.getTrueValue(values[this.typeStr.indexOf('H')]) : 0
        let minute = this.typeStr.indexOf('m') > -1 ? this.getTrueValue(values[this.typeStr.indexOf('m')]) : 0
        value = new Date(year, month - 1, date, hour, minute)
      }
      return value
    },

    onChange (picker) {
      let values = picker.$children.filter(child => child.currentValue !== undefined).map(child => child.currentValue)
      if (this.selfTriggered) {
        this.selfTriggered = false
        return
      }
      this.currentValue = this.getValue(values)
    },

    fillValues (type, start, end) {
      let values = []
      for (let i = start; i <= end; i++) {
        if (i < 10) {
          values.push(this[`${FORMAT_MAP[type]}Format`].replace('{value}', ('0' + i).slice(-2)))
        } else {
          values.push(this[`${FORMAT_MAP[type]}Format`].replace('{value}', i))
        }
      }
      return values
    },

    pushSlots (slots, type, start, end) {
      slots.push({
        values: this.fillValues(type, start, end)
      })
    },

    isDateString (str) {
      return /\d{4}(-|\/|.)\d{1,2}\1\d{1,2}/.test(str)
    },

    getYear (value) {
      return this.isDateString(value) ? value.split(' ')[0].split(/-|\/|\./)[0] : value.getFullYear()
    },

    getMonth (value) {
      return this.isDateString(value) ? value.spit('  ')[0].split(/-|\/|\./)[1] : value.getMonth() + 1
    },

    getDate (value) {
      return this.isDateString(value) ? value.split(' ')[0].split(/-|\/|\./)[2] : value.getDate()
    },

    getHour (value) {
      if (this.isDateString(value)) {
        const str = value.split(' ')[1] || '00:00:00'
        return str.split(':')[0]
      }
      return value.getHours()
    },

    rangeDetect (result, range) {
      const position = range === 'start' ? 0 : 1
      const rangeDate = range === 'start' ? this.startDate : this.endDate
      if (this.getYear(this.currentValue) === rangeDate.getFullYear()) {
        result.month[position] = rangeDate.getMonth() + 1
        if (this.getMonth(this.currentValue) === rangeDate.getMonth() + 1) {
          result.date[position] = rangeDate.getDate()
          if (this.getDate(this.currentValue) === rangeDate.getDate()) {
            result.hour[position] = rangeDate.getHours()
            if (this.getHour(this.currentValue) === rangeDate.getHours()) {
              result.min[position] = rangeDate.getMinutes()
            }
          }
        }
      }
    },

    onConfirm () {
      this.visible = false
      this.$emit('confirm', this.currentValue)
    },

    onCancel () {
      this.visible = false
      this.$emit('cancel')
    }
  },

  mounted () {
    this.currentValue = this.value
    if (!this.value) {
      if (this.type.indexOf('date') > -1) {
        this.currentValue = this.startDate
      } else {
        this.currentValue = `${('0' + this.startHour).slice(-2)}:00`
      }
    }
  },

  watch: {
    value (val) {
      this.currentValue = val
    },

    currentValue (val) {
      this.$emit('input', val)
    }
  }
})
</script>

<style scoped lang="scss">
</style>
