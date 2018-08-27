<template>
  <wv-picker
    ref="picker"
    :visible.sync="currentVisible"
    :columns="pickerColumns"
    @change="onChange"
    @confirm="onConfirm"
    @cancel="onCancel"
    :confirm-text="confirmText"
    :cancel-text="cancelText"
    :visible-item-count="visibleItemCount"
  />
</template>

<script>
import { create } from '../utils'
import WvPicker from '../picker'

const isValidDate = date => Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime())

export default create({
  name: 'datetime-picker',

  components: {
    WvPicker
  },

  props: {
    visible: Boolean,
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
      default: () => new Date(new Date().getFullYear() - 10, 0, 1),
      validator: isValidDate
    },
    endDate: {
      type: Date,
      default: () => new Date(new Date().getFullYear() + 10, 11, 31),
      validator: isValidDate
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
      currentVisible: this.visible,
      currentValue: this.correctValue(this.value)
    }
  },

  computed: {
    ranges () {
      if (this.type === 'time') {
        return {
          hour: [this.startHour, this.endHour],
          minute: [0, 59]
        }
      }

      const { startYear, startMonth, startDate, startHour, startMinute } = this.getBoundary('start', this.currentValue)
      const { endYear, endMonth, endDate, endHour, endMinute } = this.getBoundary('end', this.currentValue)

      if (this.type === 'datetime') {
        return {
          year: [startYear, endYear],
          month: [startMonth, endMonth],
          date: [startDate, endDate],
          hour: [startHour, endHour],
          minute: [startMinute, endMinute]
        }
      } else {
        return {
          year: [startYear, endYear],
          month: [startMonth, endMonth],
          date: [startDate, endDate]
        }
      }
    },

    pickerColumns () {
      let result = []
      for (let rangeKey in this.ranges) {
        result.push({
          values: this.fillColumnValues(rangeKey, this.ranges[rangeKey][0], this.ranges[rangeKey][1])
        })
      }

      return result
    }
  },

  methods: {
    open () {
      this.currentVisible = true
    },

    close () {
      this.currentVisible = false
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

    correctValue (value) {
      // validate value
      const isDateType = this.type.indexOf('date') > -1
      if (isDateType && !isValidDate(value)) {
        value = this.startDate
      } else if (!value) {
        const { startHour } = this
        value = `${startHour > 10 ? startHour : '0' + startHour}:00`
      }

      // time type
      if (!isDateType) {
        const [hour, minute] = value.split(':')
        let correctedHour = Math.max(hour, this.startHour)
        correctedHour = Math.min(correctedHour, this.endHour)

        return `${correctedHour}:${minute}`
      }

      // date type
      const { endYear, endDate, endMonth, endHour, endMinute } = this.getBoundary('end', value)
      const { startYear, startDate, startMonth, startHour, startMinute } = this.getBoundary('start', value)
      const startDay = new Date(startYear, startMonth - 1, startDate, startHour, startMinute)
      const endDay = new Date(endYear, endMonth - 1, endDate, endHour, endMinute)
      value = Math.max(value, startDay)
      value = Math.min(value, endDay)

      return new Date(value)
    },

    onChange (picker) {
      const values = picker.getValues()
      let value

      if (this.type === 'time') {
        value = values.join(':')
      } else {
        const year = this.getTrueValue(values[0])
        const month = this.getTrueValue(values[1])
        let date = this.getTrueValue(values[2])
        const endDate = this.getMonthEndDay(year, month)

        date = date > endDate ? endDate : date
        let hour = 0
        let minute = 0
        if (this.type === 'datetime') {
          hour = this.getTrueValue(values[3])
          minute = this.getTrueValue(values[4])
        }
        value = new Date(year, month - 1, date, hour, minute)
      }

      value = this.correctValue(value)
      this.currentValue = value
      this.$emit('change', picker)
      this.$emit('input', value)
    },

    fillColumnValues (type, start, end) {
      let values = []
      for (let i = start; i <= end; i++) {
        if (i < 10) {
          values.push(this[`${type}Format`].replace('{value}', ('0' + i).slice(-2)))
        } else {
          values.push(this[`${type}Format`].replace('{value}', i))
        }
      }
      return values
    },

    getBoundary (type, value) {
      const boundary = this[`${type}Date`]
      const year = boundary.getFullYear()
      let month = 1
      let date = 1
      let hour = 0
      let minute = 0

      if (type === 'end') {
        month = 12
        date = this.getMonthEndDay(value.getFullYear(), value.getMonth() + 1)
        hour = 23
        minute = 59
      }

      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1
        if (value.getMonth() + 1 === month) {
          date = boundary.getDate()
          if (value.getDate() === date) {
            hour = boundary.getHours()
            if (value.getHours() === hour) {
              minute = boundary.getMinutes()
            }
          }
        }
      }

      return {
        [`${type}Year`]: year,
        [`${type}Month`]: month,
        [`${type}Date`]: date,
        [`${type}Hour`]: hour,
        [`${type}Minute`]: minute
      }
    },

    updateColumnValue (value) {
      let values = []
      if (this.type === 'time') {
        const currentValue = value.split(':')
        values = [
          this.hourFormat.replace('{value}', `0${currentValue[0]}`.slice(-2)),
          this.minuteFormat.replace('{value}', `0${currentValue[1]}`.slice(-2))
        ]
      } else {
        values = [
          this.yearFormat.replace('{value}', `${value.getFullYear()}`),
          this.monthFormat.replace('{value}', `0${value.getMonth() + 1}`.slice(-2)),
          this.dateFormat.replace('{value}', `0${value.getDate()}`.slice(-2))
        ]
        if (this.type === 'datetime') {
          values.push(
            this.hourFormat.replace('{value}', `0${value.getHours()}`.slice(-2)),
            this.minuteFormat.replace('{value}', `0${value.getMinutes()}`.slice(-2))
          )
        }
      }

      this.$nextTick(() => {
        this.setColumnByValues(values)
      })
    },

    setColumnByValues (values) {
      this.$refs.picker.setValues(values)
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
    if (!this.value) {
      this.currentValue = this.type.indexOf('date') > -1 ? this.startDate : `${('0' + this.startHour).slice(-2)}:00`
    } else {
      this.currentValue = this.value
    }

    this.updateColumnValue(this.currentValue)
  },

  watch: {
    value (val) {
      val = this.correctValue(val)
      const isEqual = this.type === 'time' ? val === this.currentValue : val.valueOf() === this.currentValue.valueOf()

      if (!isEqual) {
        this.currentValue = val
      }
    },

    currentValue (val) {
      this.updateColumnValue(val)
      this.$emit('input', val)
    }
  }
})
</script>

<style scoped lang="scss">
</style>
