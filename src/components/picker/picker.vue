<template>
  <wv-popup v-show="currentValue">
    <div class="weui-picker__hd">
      <a href="javascript:;" class="weui-picker__action" @click="cancel">{{ cancelText }}</a>
      <a href="javascript:;" class="weui-picker__action" @click="confirm">{{ confirmText }}</a>
    </div>
    <div class="weui-picker__bd">
      <wv-picker-slot v-for="slot in slots" :values="slot.values || []" :valueKey="valueKey" v-model="values[slot.valueIndex]"></wv-picker-slot>
    </div>
  </wv-popup>
</template>

<script type="text/babel">
import Popup from '../popup/index.js'
import WvPickerSlot from './picker-slot.vue'

export default {
  name: 'wv-picker',
  componentName: 'picker',

  components: {
    WvPickerSlot,
    Popup
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
    slots: {
      type: Array
    },
    valueKey: String,
    value: Boolean
  },

  data () {
    return {
      currentValue: this.value
    }
  },

  computed: {
    values () {
      let slots = this.slots || []
      let values = []
      slots.forEach(function (slot) {
        values.push(slot.value)
      })

      return values
    },

    slotCount () {
      let slots = this.slots || []
      return slots.length
    }
  },

  created () {
    this.$on('slotValueChange', this.slotValueChange)
    let slots = this.slots || []
    this.values = []
    let values = this.values
    let valueIndexCount = 0
    slots.forEach(function (slot) {
      slot.valueIndex = valueIndexCount++
      values[slot.valueIndex] = (slot.values || [])[slot.defaultIndex || 0]
    })
  },

  methods: {
    slotValueChange () {
      this.$emit('change', this, this.values)
    },

    getSlot (slotIndex) {
      var slots = this.slots || []
      var count = 0
      var target
      var children = this.$children.filter(child => child.$options.name === 'picker-slot')

      slots.forEach(function (slot, index) {
        if (!slot.divider) {
          if (slotIndex === count) {
            target = children[index]
          }
          count++
        }
      })

      return target
    },

    getSlotValue (index) {
      var slot = this.getSlot(index)
      if (slot) {
        return slot.value
      }
      return null
    },

    setSlotValue (index, value) {
      var slot = this.getSlot(index)
      if (slot) {
        slot.currentValue = value
      }
    },

    getSlotValues (index) {
      var slot = this.getSlot(index)
      if (slot) {
        return slot.mutatingValues
      }
      return null
    },

    setSlotValues (index, values) {
      var slot = this.getSlot(index)
      if (slot) {
        slot.mutatingValues = values
      }
    },

    getValues () {
      return this.values
    },

    setValues (values) {
      var slotCount = this.slotCount
      values = values || []
      if (slotCount !== values.length) {
        throw new Error('values length is not equal slot count.')
      }

      values.forEach((value, index) => {
        this.setSlotValue(index, value)
      })
    },

    cancel () {
      this.currentValue = false
    },

    confirm () {
      this.currentValue = false
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
}
</script>
