<template>
  <div>
    <transition enter-active-class="weui-animate-fade-in" leave-active-class="weui-animate-fade-out">
      <div class="weui-mask" v-show="visible" />
    </transition>
    <transition enter-active-class="weui-animate-slide-up" leave-active-class="weui-animate-slide-down">
      <div class="weui-picker" v-show="visible">
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
                          :options="slot.values || []"
                          :valueKey="valueKey"
                          :divider="slot.divider"
                          :content="slot.content"
                          :default-index="slot.defaultIndex"
                          @change="slotValueChange" />
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
      visible: Boolean,
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
      value: []
    },

    data () {
      return {
        children: [],
        currentSlots: [],
        currentValue: []
      }
    },

    computed: {
      slotCount () {
        return this.slots.filter(slot => !slot.divider).length
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.currentSlots = this.slots
      },

      slotValueChange () {
        this.$emit('change', this, this.getValues())
      },

      getSlot (slotIndex) {
        let children = this.$children
        return children.find((child, index) => {
          return (child.$options.name === 'wv-picker-slot' && !child.divider && index === slotIndex)
        })
      },

      getSlotValue (slotIndex) {
        return (this.getSlot(slotIndex) || {}).currentValue
      },

      setSlotValue (slotIndex, value) {
        const slot = this.getSlot(slotIndex)
        slot && slot.setValue(value)
      },

      getSlotValues (slotIndex) {
        return (this.currentSlots[slotIndex] || {}).values
      },

      setSlotValues (slotIndex, values) {
        const slot = this.currentSlots[slotIndex]
        if (slot) {
          slot.values = values
        }
      },

      getValues () {
        return this.$children.filter(slot => !slot.divider).map(slot => slot.currentValue)
      },

      setValues (values) {
        if (this.slotCount !== values.length) {
          throw new Error('values length is not equal slot count.')
        }

        values.forEach((value, index) => {
          this.setSlotValue(index, value)
        })
      },

      getIndexes () {
        return this.children.map(child => child.currentIndex)
      },

      setIndexes (indexes) {
        indexes.forEach((optionIndex, slotIndex) => {
          this.setSlotIndex(slotIndex, optionIndex)
        })
      },

      onCancel () {
        this.$emit('cancel', this)
        this.$emit('update:visible', false)
      },

      onConfirm () {
        this.$emit('confirm', this)
        this.$emit('update:visible', false)
      }
    }
  })
</script>

<style scoped lang="scss">
  .weui-picker {
    transform: none;
  }
</style>
