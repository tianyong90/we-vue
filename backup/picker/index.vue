<template>
  <div>
    <transition
      enter-active-class="weui-animate-fade-in"
      leave-active-class="weui-animate-fade-out"
    >
      <div v-show="visible" class="weui-mask"/>
    </transition>
    <transition
      enter-active-class="weui-animate-slide-up"
      leave-active-class="weui-animate-slide-down"
    >
      <div v-show="visible" class="weui-picker">
        <div class="weui-picker__hd">
          <div
            class="weui-picker__action"
            @click="onCancel"
            v-text="cancelText"
          />
          <div
            class="weui-picker__action"
            @click="onConfirm"
            v-text="confirmText"
          />
        </div>
        <div class="weui-picker__bd" :style="pickerBodyStyle">
          <picker-column
            v-for="(column, index) in (simple ? [columns] : columns)"
            :key="index"
            :options="simple ? column : column.values"
            :value-key="valueKey"
            :divider="column.divider"
            :content="column.content"
            :default-index="column.defaultIndex"
            :visible-item-count="visibleItemCount"
            @change="columnValueChange(index)"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import PickerColumn from './picker-column.vue'
import deepClone from '../../utils/deep-clone'
import Vue from 'vue'

// height of th option item
const ITEM_HEIGHT = 34

export default Vue.extend({
  name: 'wv-picker',

  components: {
    PickerColumn
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
    columns: {
      type: Array,
      default: () => []
    },
    valueKey: String,
    visibleItemCount: {
      type: Number,
      default: 7,
      validator: value => {
        return [3, 5, 7].indexOf(value) > -1
      }
    },
    value: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      children: []
    }
  },

  computed: {
    pickerBodyStyle () {
      return {
        height: this.visibleItemCount * ITEM_HEIGHT + 'px'
      }
    },

    simple () {
      return this.columns.length && !this.columns[0].values
    }
  },

  watch: {
    columns () {
      this.setColumns()
    },

    value (val) {
      this.setValues(val)
    }
  },

  mounted () {
    this.setValues(this.value)
  },

  methods: {
    setColumns () {
      const columns = this.columns
      columns.forEach((column, index) => {
        this.setColumnValues(index, deepClone(column.values))
      })
    },

    columnValueChange (columnIndex) {
      if (this.simple) {
        this.$emit(
          'change',
          this,
          this.getColumnValue(0),
          this.getColumnIndex(0)
        )
      } else {
        this.$emit('change', this, this.getValues(), columnIndex)
      }
    },

    // get column instance
    getColumn (columnIndex) {
      let { children } = this
      return children.find((child, index) => {
        return (
          child.$options.name === 'wv-picker-column' &&
          !child.divider &&
          index === columnIndex
        )
      })
    },

    // get column value by index
    getColumnValue (columnIndex) {
      const column = this.getColumn(columnIndex)
      return column && column.getValue()
    },

    // set column value by index
    setColumnValue (columnIndex, value) {
      const column = this.getColumn(columnIndex)
      column && column.setValue(value)
    },

    // set options of column by index
    setColumnValues (columnIndex, values) {
      const column = this.columns[columnIndex]
      if (column) {
        column.values = values
      }
    },

    // get options of column by index
    getColumnValues (columnIndex) {
      return (this.columns[columnIndex] || {}).values
    },

    // get values of all columns
    getValues () {
      return this.children.map(child => child.getValue())
    },

    // set values of all columns
    setValues (values) {
      values.forEach((value, index) => {
        this.setColumnValue(index, value)
      })
    },

    // get column option index by column index
    getColumnIndex (columnIndex) {
      return (this.getColumn(columnIndex) || {}).currentIndex
    },

    // set column option index by column index
    setColumnIndex (columnIndex, index) {
      const column = this.getColumn(columnIndex)
      column && column.setIndex(index)
    },

    // get indexes of all columns
    getIndexes () {
      return this.children.map(child => child.currentIndex)
    },

    // set indexes of all columns
    setIndexes (indexes) {
      indexes.forEach((optionIndex, columnIndex) => {
        this.setColumnIndex(columnIndex, optionIndex)
      })
    },

    // cancel event handler
    onCancel () {
      this.$emit('cancel', this)
      this.$emit('update:visible', false)
    },

    // confirm event handler
    onConfirm () {
      this.$emit('input', this.getValues())
      this.$emit('confirm', this)
      this.$emit('update:visible', false)
    }
  }
})
</script>
