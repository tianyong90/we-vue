<template>
  <div class="weui-picker__bd" ref="body">
    <wv-picker-slot 
      v-for="(slot, key, index) in slots" 
      :key="key" 
      :values="slot.values || []" 
      :labelKey="slot.labelKey" 
      :divider="slot.divider" 
      :showItemNum="showItemNum" 
      :showItemHeight="showItemHeight" 
      :content="slot.content" 
      v-model="values[slot.valueIndex]"
    ></wv-picker-slot>
  </div>
</template>

<script>
  import WvPickerSlot from './picker-slot.vue'

  export default {
    name: 'wv-picker-view',

    components: {
      WvPickerSlot
    },

    props: {
      slots: {
        type: Array,
        required: true
      },
      defaultValues: Array,
      showItemNum: {
        type: Number,
        default: 7
      },
      showItemHeight: {
        type: Number,
        default: 34
      },
      valueKey: String,
      onChange: Function
    },

    computed: {
      values () {
        let slots = this.slots || []
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

      this.defaultValues instanceof Array && 
        this.setValues(this.defaultValues)
      
      if(this.showItemNum > 7)
        this.showItemNum = 7
    },

    mounted(){
      this.$refs.body.style.height = this.showItemHeight * this.showItemNum + 'px'
    },

    methods: {
      slotValueChange () {
        this.onChange instanceof Function &&
          this.onChange(this, this.values)
      },

      getSlot (slotIndex) {
        let slots = this.slots || []
        let count = 0
        let target

        let children = this.$children
        children = children.filter(child => child.$options.name === 'wv-picker-slot')

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
        let slot = this.getSlot(index)
        if (slot) {
          return slot.value
        }
        return null
      },

      setSlotValue (index, value, taskQueue) {
        this.$nextTick(() => {
          let slot = this.getSlot(index)
          if (slot) {
            slot.currentValue = value
            if(taskQueue.length > 0)
              slot.$nextTick(taskQueue.shift())
          }
        })
      },

      getSlotValues (index) {
        let slot = this.getSlot(index)
        if (slot) {
          return slot.mutatingValues
        }
        return null
      },

      setSlotValues (index, values) {
        this.$nextTick(() => {
          let slot = this.getSlot(index)
          var oldVal
          if (slot) {
            oldVal = slot.currentValue
            slot.mutatingValues = values
            slot.$nextTick(()=>{
              if(oldVal !== undefined && oldVal !== null)
                slot.doOnValueChange(oldVal)
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

        var taskQueue = []
        values.forEach((value, index) => {
          if(index !== 0)
            taskQueue.push(()=>{
              this.setSlotValue(index, value, taskQueue)
            })
        })
        this.setSlotValue(0, values[0], taskQueue)
      }
    }
  }
</script>

<style scoped lang="scss">
  
</style>
