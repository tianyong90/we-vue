import WVPicker from '../picker'

import Vue from 'vue'
import { PropValidator } from 'vue/types/options'

// Mixins
import { factory as ToaaleableFactory } from '../../mixins/toggleable'
// Utils
import mixins from '../../utils/mixins'

type PickerInstance = InstanceType<typeof WVPicker>

enum columnType {
  province = 'province',
  city = 'city',
  county = 'county'
}

type typeAreaList = {
  /* eslint-disable camelcase */
  province_list?: {
    [code: string]: string
  }
  /* eslint-disable camelcase */
  city_list?: {
    [code: string]: string
  }
  /* eslint-disable camelcase */
  county_list?: {
    [code: string]: string
  }
}

// 每列的选项值类型， { '110000': '北京' }
type typeArea = {
  [code: string]: string
}

interface ioptions extends Vue {
  $refs: {
    picker: PickerInstance
  }
}

export default mixins<ioptions>(
  ToaaleableFactory('visible', 'update:visible')
).extend({
  name: 'wv-area',

  components: {
    WVPicker,
  },

  props: {
    areaList: {
      type: Object,
      default: () => ({}),
    } as PropValidator<typeAreaList>,
    confirmText: {
      type: String,
      default: '确定',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    visibleItemCount: {
      type: Number,
      default: 7,
    },
    columnsCount: {
      type: [String, Number],
      default: 3,
      validator: (value: string | number) => {
        return value >= 1 && value <= 3
      },
    },
    value: {
      type: String,
      required: false,
    },
  },

  data () {
    return {
      lazyValue: this.value as string,
      columns: [{ options: [] }, { options: [] }, { options: [] }],
    }
  },

  computed: {
    internalValue: {
      get (): string {
        return this.lazyValue
      },
      set (val: string): void {
        this.lazyValue = val
        this.$emit('input', val)
      },
    },

    province (): typeArea {
      return this.areaList.province_list || {}
    },

    city (): typeArea {
      return this.areaList.city_list || {}
    },

    county (): typeArea {
      return this.areaList.county_list || {}
    },

    displayColumns (): Array<any> {
      return this.columns.slice(0, +this.columnsCount)
    },
  },

  watch: {
    value (val) {
      this.internalValue = val
      this.setOptions()
    },

    areaList: {
      deep: true,
      handler () {
        this.setOptions()
      },
    },
  },

  mounted () {
    this.setOptions()
  },

  methods: {
    open (): void {
      this.$emit('update: visible', true)
    },

    close (): void {
      this.$emit('update: visible', false)
    },

    getList (type: columnType, code: string = ''): Array<typeArea> {
      let result: Array<typeArea> = []
      if (type !== 'province' && !code) {
        return result
      }

      const list = this[type]

      result = Object.keys(list).map((listCode: string) => ({
        code: listCode,
        name: list[listCode],
      }))

      if (code) {
        result = result.filter(item => (item.code as string).indexOf(code) === 0)
      }

      return result
    },

    // get index for column
    getIndex (type: columnType, code: string): number {
      const compareNum = type === 'province' ? 2 : type === 'city' ? 4 : 6
      const list = this.getList(type, code.slice(0, compareNum - 2))
      code = code.slice(0, compareNum)

      for (let i = 0; i < list.length; i++) {
        if ((list[i].code as string).slice(0, compareNum) === code) {
          return i
        }
      }

      return 0
    },

    // set column values
    setOptions (): void {
      let code = this.internalValue || Object.keys(this.county)[0] || ''
      const { picker } = this.$refs
      const province = this.getList(columnType.province)
      const city = this.getList(columnType.city, code.slice(0, 2))

      if (!picker) {
        return
      }

      picker.setColumnOptions(0, province)
      picker.setColumnOptions(1, city)

      if (city.length && code.slice(2, 4) === '00') {
        code = city[0].code as string
      }

      picker.setColumnOptions(2, this.getList(columnType.county, code.slice(0, 4)))
      picker.setIndexes([
        this.getIndex(columnType.province, code),
        this.getIndex(columnType.city, code),
        this.getIndex(columnType.county, code),
      ])
    },

    // get current selected values of all typeColumns
    getValues (): Array<typeArea> {
      return this.$refs.picker ? this.$refs.picker.getValues() : []
    },

    getArea (): object {
      const values = this.getValues()
      const area = {
        code: '',
        country: '',
        province: '',
        city: '',
        county: '',
      }

      if (!values.length) {
        return area
      }

      const names = values.map(item => item.name)
      area.code = this.internalValue

      if (area.code[0] === '9') {
        area.country = names[1] || ''
        area.province = names[2] || ''
      } else {
        area.province = names[0] || ''
        area.city = names[1] || ''
        area.county = names[2] || ''
      }

      return area
    },

    onChange (picker: PickerInstance, values: Array<typeArea>, index: number) {
      this.internalValue = values[index].code as string
      this.setOptions()
      this.$emit('change', picker, values, index)
    },

    reset (): void {
      this.internalValue = ''
      this.setOptions()
    },

    onConfirm () {
      this.isActive = false
      this.$emit('confirm', this.internalValue)
    },

    onCancel () {
      this.isActive = false
      this.$emit('cancel')
    },
  },

  render (h) {
    const on = {
      ...this.$listeners,
      change: this.onChange,
      cancel: () => { this.onCancel() },
      confirm: () => { this.onConfirm() },
    }

    return (
      <WVPicker
        ref="picker"
        visible={this.isActive}
        columns={this.displayColumns}
        cancelText={this.cancelText}
        confirmText={this.confirmText}
        visibleItemCount={this.visibleItemCount}
        valueKey="name"
        {...{ on }}
      />
    )
  },
})
