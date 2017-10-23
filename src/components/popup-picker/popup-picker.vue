<template>
  <div class="weui-picker">
    <div class="weui-picker__hd">
      <a class="weui-picker__action" @click="cancel" v-text="cancelText"></a>
      <a class="weui-picker__action" @click="confirm" v-text="confirmText"></a>
    </div>
    <div class="weui-picker__bd">
      <wv-picker-slot v-for="(slot, key, index) in slots" :key="key" :values="slot.values || []" :valueKey="valueKey" :divider="slot.divider" :content="slot.content" v-model="values[slot.valueIndex]"></wv-picker-slot>
    </div>
  </div>
</template>

<script>
  import WvPickerSlot from './picker-slot.vue'

  export default {
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
      defaultValues: Array,
      valueKey: String,
      onConfirm: Function,
      onCancel: Function,
      onChange: Function,
      onInput: Function
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
      this.event = {
        beforeEnter: () => {
          var $el = this.$el;

          $el.classList.add('inital');
          requestAnimationFrame(function(){
            setTimeout(()=>{//给50ms来处理dom的一些设置
              $el.classList.remove('inital');
              $el.classList.add('inAnimation');

              this.onOpen instanceof Function && this.onOpen();
            }, 50)
          }.bind(this))
        },
        beforeLeave: () => {
          var $el = this.$el;
          $el.classList.add('outAnimation');
          requestAnimationFrame(function(){
            $el.classList.remove('inAnimation');

            this.onClose instanceof Function && this.onClose();
          }.bind(this))
        }
      }

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
          if (slot) {
            slot.mutatingValues = values
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
      },

      cancel () {
        this.onCancel instanceof Function && this.onCancel(this)
        this._controller.close()
      },

      confirm () {
        this.onConfirm instanceof Function && this.onConfirm(this)
        this._controller.close()
      }
    },

    watch: {
      value (val) {
        this.currentValue = val
      },

      currentValue (val) {
        this.onInput instanceof Function && 
          this.onInput(val)
      }
    }
  }
</script>

<style scoped lang="scss">
  .weui-picker{
    will-change: opacity, transform;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: auto;
    transition: all 250ms ease 0s;

    &.inital {
      opacity: 0.3;
      transform: translateY(100%) translateZ(0);
    }

    &.inAnimation {
      opacity: 1;
      transform: translateY(0%) translateZ(0);
    }

    &.outAnimation {
      opacity: 0;
      transform: translateY(100%) translateZ(0);
      transition-duration: 280ms;
    }
  }
</style>
