import WPickerColumn from './WPickerColumn'
// Types
import { PropValidator } from 'vue/types/options'
import { CreateElement, VNode } from 'vue'
// Mixins
import { factory as ToaaleableFactory } from '../../mixins/toggleable'
// Utils

import mixins from '../../utils/mixins'
import cloneDeep from 'lodash/cloneDeep'

// height of th option item
const ITEM_HEIGHT = 34

type WPickerColumnInstance = InstanceType<typeof WPickerColumn>

type objectColumn = {
  options: Array<any>
  [key: string]: any
}

type simpleColumns = Array<string | number | object>

type typeColumns = Array<Array<string | number | objectColumn>>

export default mixins(ToaaleableFactory('visible', 'update:visible')).extend({
  name: 'w-picker',

  props: {
    confirmText: {
      type: String,
      default: '确定',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    closeOnClickMask: {
      type: Boolean,
      default: true,
    },
    columns: {
      type: Array,
      default: () => [],
    } as PropValidator<typeColumns | simpleColumns>,
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
      children: [] as Array<WPickerColumnInstance>,
    }
  },

  computed: {
    pickerBodyStyle (): object {
      return {
        height: this.visibleItemCount * ITEM_HEIGHT + 'px',
      }
    },

    simple (): boolean {
      return this.columns.length > 0 && !(this.columns[0] as objectColumn).options
    },
  },

  watch: {
    columns (val) {
      this.setColumns(val)
    },

    value (val) {
      this.setValues(val)
    },
  },

  mounted () {
    this.setValues(this.value)
  },

  methods: {
    open (): void {
      this.isActive = true
    },

    close (): void {
      this.isActive = false
    },

    setColumns (columns: typeColumns | simpleColumns): void {
      columns.forEach((column, index: number) => {
        this.setColumnOptions(index, cloneDeep((column as objectColumn).options))
      })
    },

    columnValueChange (columnIndex: number): void {
      if (this.simple) {
        this.$emit('change', this, this.getColumnOptions(0), this.getColumnIndex(0))
      } else {
        this.$emit('change', this, this.getValues(), columnIndex)
      }
    },

    // get column instance
    getColumn (columnIndex: number) {
      let { children } = this
      return children.find((child, index) => {
        return child.$options.name === 'w-picker-column' && index === columnIndex
      })
    },

    // get column value by index
    getColumnValue (columnIndex: number): any {
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
        ;(column as objectColumn).options = options
      }
    },

    // get options of column by index
    getColumnOptions (columnIndex: number): Array<string | number> {
      return (this.columns[columnIndex] as objectColumn).options
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
      return this.getColumn(columnIndex)!.currentIndex
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

    onClickMask (): void {
      if (!this.closeOnClickMask) return

      this.onCancel()
    },

    // cancel event hand: Array<number>l: voider
    onCancel (): void {
      this.$emit('cancel', this)
      this.isActive = false
    },

    // confirm event handler
    onConfirm (): void {
      // TODO: v-model 问题
      this.$emit('input', this.getValues())
      this.$emit('confirm', this)
      this.isActive = false
    },
  },

  render (h: CreateElement): VNode {
    return (
      <div>
        <transition enter-active-class="weui-animate-fade-in" leave-active-class="weui-animate-fade-out">
          <div vShow={this.isActive} class="weui-mask" onClick={this.onClickMask} />
        </transition>
        <transition enter-active-class="weui-animate-slide-up" leave-active-class="weui-animate-slide-down">
          <div vShow={this.isActive} class="weui-picker">
            <div class="weui-picker__hd">
              <div class="weui-picker__action" onClick={this.onCancel} domPropsTextContent={this.cancelText} />
              <div class="weui-picker__action" onClick={this.onConfirm} domPropsTextContent={this.confirmText} />
            </div>
            <div class="weui-picker__bd" style={this.pickerBodyStyle}>
              {(this.simple ? [this.columns] : this.columns).map((column, index) => (
                <WPickerColumn
                  key={index}
                  options={this.simple ? column : (column as any).options}
                  value-key={this.valueKey}
                  default-index={(column as any).defaultIndex}
                  visible-item-count={this.visibleItemCount}
                  onChange={() => {
                    this.columnValueChange(index)
                  }}
                />
              ))}
            </div>
          </div>
        </transition>
      </div>
    )
  },
})
