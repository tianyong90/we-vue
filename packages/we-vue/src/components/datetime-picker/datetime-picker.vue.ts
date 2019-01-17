import Vue from 'vue'
import { PropValidator } from 'vue/types/options';
import WVPicker from '../picker'

// Utils
import mixins, { ExtractVue } from '../../utils/mixins'

// Mixins
import Colorable from '../../mixins/colorable'

type startBoundary = {
  startYear: number
  startMonth: number
  startDate: number
  startHour: number
  startMinute: number
}

type endBoundary = {
  endYear: number
  endMonth: number
  endDate: number
  endHour: number
  endMinute: number
}

type valueRange = {
  year?: [number, number]
  month?: [number, number]
  date?: [number, number]
  hour?: [number, number]
  minute?: [number, number]
}

type PickerInstance = InstanceType<typeof WVPicker>

interface options extends Vue {
  $refs: {
    picker: PickerInstance
  }
}

const currentYear = new Date().getFullYear()
const isValidDate = (date: any) =>
  Object.prototype.toString.call(date) === '[object Date]' &&
  !isNaN(date.getTime())

export default mixins<options &
  ExtractVue<[
    typeof Colorable
  ]>
>(
  Colorable
).extend({
  name: 'wv-datetime-picker',

  components: {
    WVPicker,
  },

  props: {
    visible: Boolean,
    confirmText: {
      type: String,
      default: '确定',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    type: {
      type: String,
      default: 'datetime',
    },
    startDate: {
      type: Date,
      default: () => new Date(currentYear - 10, 0, 1),
      validator: isValidDate,
    } as PropValidator<Date>,
    endDate: {
      type: Date,
      default: () => new Date(currentYear + 10, 11, 31),
      validator: isValidDate,
    } as PropValidator<Date>,
    startHour: {
      type: Number,
      default: 0,
    },
    endHour: {
      type: Number,
      default: 23,
    },
    yearFormat: {
      type: String,
      default: '{value}',
    },
    monthFormat: {
      type: String,
      default: '{value}',
    },
    dateFormat: {
      type: String,
      default: '{value}',
    },
    hourFormat: {
      type: String,
      default: '{value}',
    },
    minuteFormat: {
      type: String,
      default: '{value}',
    },
    visibleItemCount: {
      type: Number,
      default: 7,
    },
    value: {} as PropValidator<Date | string>,
  },

  data () {
    return {
      currentVisible: this.visible,
      currentValue: this.value,
    }
  },

  computed: {
    ranges (): valueRange {
      if (this.type === 'time') {
        return {
          hour: [this.startHour, this.endHour],
          minute: [0, 59],
        }
      }

      const {
        startYear,
        startMonth,
        startDate,
        startHour,
        startMinute,
      } = this.getBoundary('start', <Date>this.currentValue) as startBoundary
      const {
        endYear,
        endMonth,
        endDate,
        endHour,
        endMinute,
      } = this.getBoundary('end', <Date>this.currentValue) as endBoundary

      if (this.type === 'datetime') {
        return {
          year: [startYear, endYear],
          month: [startMonth, endMonth],
          date: [startDate, endDate],
          hour: [startHour, endHour],
          minute: [startMinute, endMinute],
        }
      } else {
        return {
          year: [startYear, endYear],
          month: [startMonth, endMonth],
          date: [startDate, endDate],
        }
      }
    },

    columns (): Array<any> {
      let result = []
      for (let rangeKey in this.ranges) {
        result.push({
          options: this.fillColumnOptions(
            rangeKey,
            (this.ranges as any)[rangeKey][0],
            (this.ranges as any).ranges[rangeKey][1]
          ),
        })
      }
      return result
    },
  },

  watch: {
    value (val) {
      val = this.correctValue(val)
      const isEqual =
        this.type === 'time'
          ? val === this.currentValue
          : val.valueOf() === this.currentValue.valueOf()

      if (!isEqual) {
        this.currentValue = val
      }
    },

    currentValue (val) {
      this.updateColumnValue(val)
      this.$emit('input', val)
    },
  },

  mounted () {
    if (!this.value) {
      this.currentValue =
        this.type.indexOf('date') > -1
          ? this.startDate
          : `${('0' + this.startHour).slice(-2)}:00`
    } else {
      this.currentValue = this.value
    }

    this.updateColumnValue(this.currentValue)
  },

  methods: {
    open (): void {
      this.currentVisible = true
    },

    close (): void {
      this.currentVisible = false
    },

    getMonthEndDay (year: number, month: number): number {
      // Date() 第三参数为 0，实际返回上一个月最后一天，注意 Date 对象中 month 实际从 0 开始，而形参 month 表示实际月份
      return new Date(year, month, 0).getDate()
    },

    getTrueValue (formattedValue: string): number {
      while (isNaN(parseInt(formattedValue, 10))) {
        formattedValue = formattedValue.slice(1)
      }
      return parseInt(formattedValue, 10)
    },

    correctValue (value: Date | string | number): Date | string {
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
        const [hour, minute] = (<string>value).split(':')
        let correctedHour = Math.max(parseInt(hour), this.startHour)
        correctedHour = Math.min(correctedHour, this.endHour)

        return `${correctedHour}:${minute}`
      }

      // date type
      const {
        endYear,
        endMonth,
        endDate,
        endHour,
        endMinute,
      } = this.getBoundary('end', <Date>value) as endBoundary
      const {
        startYear,
        startMonth,
        startDate,
        startHour,
        startMinute,
      } = this.getBoundary('start', <Date>value) as startBoundary

      const startDay = new Date(
        startYear,
        startMonth - 1,
        startDate,
        startHour,
        startMinute
      )
      const endDay = new Date(
        endYear,
        endMonth - 1,
        endDate,
        endHour,
        endMinute
      )
      value = Math.min(Math.max((<Date>value).getTime(), startDay.getTime()), endDay.getTime())

      return new Date(value)
    },

    onChange (picker: PickerInstance): void {
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

    fillColumnOptions (type: string, start: number, end: number): any[] {
      let options = []
      for (let i = start; i <= end; i++) {
        if (i < 10) {
          options.push(
            (this as any)[`${type}Format`].replace('{value}', ('0' + i).slice(-2))
          )
        } else {
          options.push((this as any)[`${type}Format`].replace('{value}', i))
        }
      }
      return options
    },

    getBoundary (type: 'start' | 'end', value: Date): startBoundary | endBoundary {
      const boundary = type === 'start' ? this.startDate : this.endDate
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

      return type === 'start' ? {
        startYear: year,
        startMonth: month,
        startDate: date,
        startHour: hour,
        startMinute: minute,
      } : {
        endYear: year,
        endMonth: month,
        endDate: date,
        endHour: hour,
        endMinute: minute,
      }
    },

    updateColumnValue (value: string | Date) {
      let values: string[] = []
      if (this.type === 'time') {
        const currentValue = (<string>value).split(':')
        values = [
          this.hourFormat.replace('{value}', `0${currentValue[0]}`.slice(-2)),
          this.minuteFormat.replace('{value}', `0${currentValue[1]}`.slice(-2)),
        ]
      } else {
        values = [
          this.yearFormat.replace('{value}', `${(<Date>value).getFullYear()}`),
          this.monthFormat.replace(
            '{value}',
            `0${(<Date>value).getMonth() + 1}`.slice(-2)
          ),
          this.dateFormat.replace('{value}', `0${(<Date>value).getDate()}`.slice(-2)),
        ]
        if (this.type === 'datetime') {
          values.push(
            this.hourFormat.replace(
              '{value}',
              `0${(<Date>value).getHours()}`.slice(-2)
            ),
            this.minuteFormat.replace(
              '{value}',
              `0${(<Date>value).getMinutes()}`.slice(-2)
            )
          )
        }
      }

      this.$nextTick(() => {
        this.setColumnByValues(values)
      })
    },

    setColumnByValues (values: Array<string>) {
      this.$refs.picker.setValues(values)
    },

    onConfirm () {
      // TODO
      // this.visible = false
      this.$emit('confirm', this.currentValue)
    },

    onCancel () {
      // TODO
      // this.visible = false
      this.$emit('cancel')
    },
  },
})
