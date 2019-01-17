import PickerColumn from './picker-column.vue'
import Vue from 'vue'
// Mixins
import Colorable from '../../mixins/colorable'
// Utils
import mixins from '../../utils/mixins'
// Types
import { PropValidator } from 'vue/types/options'

import cloneDeep from 'lodash/cloneDeep'

// height of th option item
const ITEM_HEIGHT = 34

type PickerColumnInstance = InstanceType<typeof PickerColumn>

type objectColumn = {
  options: Array<any>
  [key: string]: any
}

type simpleColumns = Array<string | number | object>

type columns = Array<Array<
  string | number | objectColumn
>>

interface options extends Vue {
}

export default mixins<options>(
  Colorable
).extend({
  name: 'wv-picker',

  components: {
    PickerColumn,
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
    columns: {
      type: Array,
      default: () => [],
    } as PropValidator<columns | simpleColumns>,
    valueKey: String,
    visibleItemCount: {
      type: Number,
      default: 7,
      validator: (val: number) => {
        return [3, 5, 7].indexOf(val) > -1
      },
    },
    value: {
      type: Array,
      default: () => [],
    } as PropValidator<any>,
  },

  data () {
    return {
      children: [] as Array<PickerColumnInstance>,
    }
  },

  computed: {
    pickerBodyStyle (): object {
      return {
        height: this.visibleItemCount * ITEM_HEIGHT + 'px',
      }
    },

    simple (): boolean {
      return this.columns.length > 0 && !(<objectColumn>this.columns[0]).options
    },
  },

  watch: {
    columns () {
      this.setColumns()
    },

    value (val) {
      this.setValues(val)
    },
  },

  mounted () {
    this.setValues(this.value)
  },

  methods: {
    setColumns (): void {
      const columns = this.columns
      columns.forEach((column, index: number) => {
        this.setColumnOptions(index, cloneDeep((<objectColumn>column).options))
      })
    },

    columnValueChange (columnIndex: number): void {
      if (this.simple) {
        this.$emit(
          'change',
          this,
          this.getColumnOptions(0),
          this.getColumnIndex(0)
        )
      } else {
        this.$emit('change', this, this.getValues(), columnIndex)
      }
    },

    // get column instance
    getColumn (columnIndex: number) {
      let { children } = this
      return children.find((child, index) => {
        return (
          child.$options.name === 'wv-picker-column' &&
          index === columnIndex
        )
      })
    },

    // get column value by index
    getColumnOptions (columnIndex: number): any {
      const column = this.getColumn(columnIndex)
      return column && column.getValue()
    },

    // set column value by index
    setColumnValue (columnIndex: number, value: any): void {
      const column = this.getColumn(columnIndex)
      column && column.setValue(value)
    },

    // set options of column by index
    setColumnOptions (columnIndex: number, options: Array<string | number | object>): void {
      const column = this.columns[columnIndex]
      if (column) {
        (<objectColumn>column).options = options
      }
    },

    // get options of column by index
    getColumnOptionss (columnIndex: number): Array<string | number> {
      return (<objectColumn>this.columns[columnIndex]).options
    },

    // get values of all columns
    getValues (): Array<any> {
      return this.children.map(child => child.getValue())
    },

    // set values of all columns
    setValues (values: Array<any>): void {
      values.forEach((value, index) => {
        this.setColumnValue(index, value)
      })
    },

    // get column option index by column index
    getColumnIndex (columnIndex: number): number {
      return (this.getColumn(columnIndex))!.currentIndex
    },

    // set column option index by column index
    setColumnIndex (columnIndex: number, index: number): void {
      const column = this.getColumn(columnIndex)
      column && column.setIndex(index)
    },

    // get indexes of all columns
    getIndexes (): number[] {
      return this.children.map(child => child.currentIndex)
    },

    // set indexes of all columns
    setIndexes (indexes: Array<number>): void {
      indexes.forEach((optionIndex, columnIndex) => {
        this.setColumnIndex(columnIndex, optionIndex)
      })
    },

    // cancel event hand: Array<number>l: voider
    onCancel (): void {
      this.$emit('cancel', this)
      this.$emit('update:visible', false)
    },

    // confirm event handler
    onConfirm (): void {
      this.$emit('input', this.getValues())
      this.$emit('confirm', this)
      this.$emit('update:visible', false)
    },
  },
})
