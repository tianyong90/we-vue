import WPicker from '../WPicker'

import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
// Mixins
import Picker from '@/mixins/picker'
// Utils
import mixins, { ExtractVue } from '@/utils/mixins'

type PickerInstance = InstanceType<typeof WPicker>

enum columnType {
  province = 'province',
  city = 'city',
  county = 'county',
}

type AreaList = {
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
type Area = {
  [code: string]: string
}

interface Options extends Vue {
  $refs: {
    picker: PickerInstance
  }
}

export default mixins<Options & ExtractVue<[typeof Picker]>>(Picker).extend({
  name: 'w-area-picker',

  components: {
    WPicker,
  },

  props: {
    areaList: {
      type: Object,
      default: () => ({}),
    } as PropValidator<AreaList>,
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
      internalValue: this.value,
      columns: [{ options: [] }, { options: [] }, { options: [] }],
    }
  },

  computed: {
    province (): Area {
      return this.areaList.province_list || {}
    },

    city (): Area {
      return this.areaList.city_list || {}
    },

    county (): Area {
      return this.areaList.county_list || {}
    },

    displayColumns (): any[] {
      return this.columns.slice(0, +this.columnsCount)
    },
  },

  watch: {
    value (val) {
      this.internalValue = val
    },

    internalValue (val) {
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
    getList (type: columnType, code = ''): Area[] {
      let result: Area[] = []
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

    // set column options
    setOptions (): void {
      let code = this.internalValue || Object.keys(this.county)[0] || ''
      const { picker } = this.$refs
      /* istanbul ignore next */
      if (!picker) {
        return
      }
      const province = this.getList(columnType.province)
      const city = this.getList(columnType.city, code.slice(0, 2))

      picker.setColumnOptions(0, province)
      picker.setColumnOptions(1, city)

      if (city.length && code.slice(2, 4) === '00') {
        code = city[0].code as string
      }

      picker.setColumnOptions(2, this.getList(columnType.county, code.slice(0, 4)))

      picker.$nextTick(() => {
        picker.setIndexes([
          this.getIndex(columnType.province, code),
          this.getIndex(columnType.city, code),
          this.getIndex(columnType.county, code),
        ])
      })
    },

    // get current selected values of all typeColumns
    getValues (): Area[] {
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

    onChange (picker: PickerInstance, values: any[], columnIndex: number): void {
      this.internalValue = values[columnIndex].code as string
      this.setOptions()
      this.$emit('change', picker, values)
    },

    reset (): void {
      this.internalValue = ''
      this.setOptions()
    },

    setColumnByValues (values: string[]) {
      this.$refs.picker.setValues(values)
    },

    onCancel () {
      this.isActive = false
      this.$emit('cancel')
    },

    onConfirm () {
      this.isActive = false
      this.$emit('input', this.internalValue)
      this.$emit('confirm', this.internalValue)
    },
  },

  render (): VNode {
    return (
      <WPicker
        ref="picker"
        visible={this.isActive}
        columns={this.displayColumns}
        cancelText={this.cancelText}
        confirmText={this.confirmText}
        closeOnClickMask={this.closeOnClickMask}
        visibleItemCount={this.visibleItemCount}
        valueKey="name"
        onChange={this.onChange}
        onCancel={this.onCancel}
        onConfirm={this.onConfirm}
      />
    )
  },
})
