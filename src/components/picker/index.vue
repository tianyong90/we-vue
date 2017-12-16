<template>
  <div v-show="visible">
    <transition enter-active-class="weui-animate-fade-in" leave-active-class="weui-animate-fade-out">
      <div class="weui-mask" />
    </transition>
    <transition enter-active-class="weui-animate-slide-up" leave-active-class="weui-animate-slide-down">
      <div class="weui-picker weui-animate-slide-up">
        <div class="weui-picker__hd">
          <div class="weui-picker__action"
               @click="onCancel"
               v-text="cancelText" />
          <div class="weui-picker__action"
               @click="onConfirm"
               v-text="confirmText" />
        </div>
        <div class="weui-picker__bd">
          <wv-picker-slot v-for="(slot, index) in slots"
                          :key="index"
                          :values="slot.values || []"
                          :valueKey="valueKey"
                          :divider="slot.divider"
                          :content="slot.content"
                          v-model="values[slot.valueIndex]" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import WvPickerSlot from './picker-slot.vue'

  import { create } from '../../utils'

  export default create({
    name: 'wv-picker',

    components: {
      WvPickerSlot
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
        type: Array,
        required: true
      },
      valueKey: String,
      value: {
        type: Array,
        default: () => []
      },
      visible: Boolean
    },

    data () {
      return {
        currentValue: this.value
      }
    },

    computed: {
      values () {
        const slots = this.slots || []
        let values = []
        slots.forEach(function (slot) {
          if (!slot.divider) values.push(slot.value)
        })
        return values
      },

      slotCount () {
        let slots = this.slots || []
        let count = 0
        slots.forEach((slot) => {
          if (!slot.divider) count++
        })
        return count
      }
    },

    created () {
      this.$on('slotValueChange', this.slotValueChange)
      let slots = this.slots || []
      let values = this.values
      let valueIndexCount = 0
      slots.forEach(slot => {
        if (!slot.divider) {
          slot.valueIndex = valueIndexCount++
          values[slot.valueIndex] = (slot.values || [])[slot.defaultIndex || 0]
          this.slotValueChange()
        }
      })
    },

    methods: {
      slotValueChange () {
        this.$emit('change', this, this.values)
        this.currentValue = this.values
      },

      getSlot (slotIndex) {
        let children = this.$children
        return children.find((child, index) => {
          return (child.$options.name === 'wv-picker-slot' && !child.divider && index === slotIndex)
        })
      },

      getSlotValue (slotIndex) {
        const slot = this.getSlot(slotIndex)

        return slot ? slot.value : null
      },

      setSlotValue (slotIndex, value, taskQueue) {
        this.$nextTick(() => {
          let slot = this.getSlot(slotIndex)
          if (slot) {
            slot.currentValue = value
            if (taskQueue && taskQueue.length > 0) {
              slot.$nextTick(taskQueue.shift())
            }
          }
        })
      },

      getSlotValues (slotIndex) {
        const slot = this.getSlot(slotIndex)

        return slot ? slot.mutatingValues : null
      },

      setSlotValues (index, values) {
        this.$nextTick(() => {
          let slot = this.getSlot(index)
          if (slot) {
            let oldVal = slot.currentValue
            slot.mutatingValues = values
            slot.$nextTick(() => {
              if (oldVal !== undefined && oldVal !== null) {
                slot.doOnValueChange(oldVal)
              }
              oldVal = null
            })
          }
        })
      },

      getValues () {
        return this.values
      },

      setValues (values) {
        values = values || []
        if (this.slotCount !== values.length) {
          throw new Error('values length is not equal slot count.')
        }

        let taskQueue = []
        values.forEach((value, index) => {
          if (index !== 0) {
            taskQueue.push(() => {
              this.setSlotValue(index, value, taskQueue)
            })
          }
        })
        this.setSlotValue(0, values[0], taskQueue)
      },

      onCancel () {
        this.$emit('cancel', this)
        this.$emit('update:visible', false)
      },

      onConfirm () {
        this.$emit('confirm', this)
        this.$emit('update:visible', false)
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
