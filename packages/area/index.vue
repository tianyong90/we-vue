<template>
  <wv-picker
    ref="picker"
    :visible.sync="currentVisible"
    :columns="displayColumns"
    value-key="name"
    @change="onChange"
    @confirm="$emit('confirm', $event)"
    @cancel="$emit('cancel', $event)"
    :confirm-text="confirmText"
    :cancel-text="cancelText"
    :visible-item-count="visibleItemCount"
  />
</template>

<script>
import { create } from '../utils'
import Picker from '../picker'

export default create({
  name: 'area',

  components: {
    Picker
  },

  props: {
    visible: Boolean,
    areaList: {
      type: Object,
      default: () => ({})
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    visibleItemCount: {
      type: Number,
      default: 7
    },
    columnsNum: {
      type: [String, Number],
      default: 3
    },
    value: String
  },

  data () {
    return {
      code: this.value,
      columns: [{ values: [] }, { values: [] }, { values: [] }],
      currentVisible: this.visible
    }
  },

  computed: {
    province () {
      return this.areaList.province_list || {}
    },

    city () {
      return this.areaList.city_list || {}
    },

    county () {
      return this.areaList.county_list || {}
    },

    displayColumns () {
      return this.columns.slice(0, +this.columnsNum)
    }
  },

  methods: {
    getList (type, code) {
      let result = []
      if (type !== 'province' && !code) {
        return result
      }

      const list = this[type]
      result = Object.keys(list).map(code => ({
        code,
        name: list[code]
      }))

      if (code) {
        result = result.filter(item => item.code.indexOf(code) === 0)
      }

      return result
    },

    getIndex (type, code) {
      const compareNum = type === 'province' ? 2 : type === 'city' ? 4 : 6
      const list = this.getList(type, code.slice(0, compareNum - 2))
      code = code.slice(0, compareNum)

      for (let i = 0; i < list.lngth; i++) {
        if (list[i].code.slice(0, compareNum) === code) {
          return i
        }
      }

      return 0
    },

    onChange (picker, values, index) {
      this.code = values[index].code
      this.setValues()
      this.$emit('change', picker, values, index)
    },

    setValues () {
      let code = this.code || Object.keys(this.county)[0] || ''
      const { picker } = this.$refs
      const province = this.getList('province')
      const city = this.getList('city', code.slice(0, 2))

      if (!picker) {
        return
      }

      console.log(province)

      picker.setColumnValues(0, province)
      picker.setColumnValues(1, city)

      if (city.length && code.slice(2, 4) === '00') {
        code = city[0].code
      }

      picker.setColumnValues(2, this.getList('county', code.slice(0, 4)))
      picker.setIndexes([
        this.getIndex('province', code),
        this.getIndex('city', code),
        this.getIndex('county', code)
      ])
    },

    getValues () {
      return this.$refs.picker ? this.$refs.picker.getValues() : []
    },

    reset () {
      this.code = ''
      this.stValues()
    }
  },

  mounted () {
    this.setValues()
  },

  watch: {
    value () {
      this.code = this.value
      this.setValues()
    },

    areaList: {
      deep: true,
      handler () {
        this.setValues()
      }
    }
  }
})
</script>
