<template>
  <div class="weui-picker__group">
    <div class="weui-picker__mask"></div>
    <div class="weui-picker__indicator"></div>
    <div class="weui-picker__content" ref="listWrapper">
      <div class="weui-picker__item"
        :class="{ 'weui-picker__item_disabled': typeof item === 'object' && item['disabled'] }" v-for="item in mutatingValues" v-text="typeof item === 'object' && item[valueKey] ? item[valueKey] : item"></div>
    </div>
  </div>
</template>

<script type="text/babel">
import draggable from '../../utils/draggable.js'
import Transform from 'css3transform'

// 每个选项高度
const ITEM_HEIGHT = 34

export default {
  name: 'wv-picker-slot',

  props: {
    values: {
      type: Array,
      default () {
        []
      }
    },
    value: {},
    valueKey: String
  },

  data () {
    return {
      mutatingValues: this.values,
      currentValue: this.value,
      isDragging: false
    }
  },

  computed: {
    minTranslateY () {
      return ITEM_HEIGHT * (4 - this.values.length)
    },

    maxTranslateY () {
      return ITEM_HEIGHT * 3
    }
  },

  mounted () {
    this.currentValue = this.value
    this.mutatingValues = this.values
    Transform(this.$refs.listWrapper, true)

    let startPositionY = 0
    let startTranslateY = 0
    draggable(this.$el, {
      start: (e) => {
        startPositionY = e.clientY
        startTranslateY = this.$refs.listWrapper.translateY

        this.isDragging = true
      },
      drag: (e) => {
        const deltaY = e.clientY - startPositionY

        const tempTranslateY = startTranslateY + deltaY

        if (tempTranslateY <= this.minTranslateY) {
          this.$refs.listWrapper.translateY = this.minTranslateY
        } else if (tempTranslateY >= this.maxTranslateY) {
          this.$refs.listWrapper.translateY = this.maxTranslateY
        } else {
          this.$refs.listWrapper.translateY = startTranslateY + deltaY
        }
      },
      end: (e) => {
        this.$refs.listWrapper.translateY = Math.round(this.$refs.listWrapper.translateY / ITEM_HEIGHT) * ITEM_HEIGHT

        this.isDragging = false
      }
    })
  },

  methods: {
    value2translate (value) {
      const index = this.mutatingValues.indexOf(this.currentValue)

      return index
    },

    translate2value (translate) {
      const index = 1

      return this.mutatingValues[index]
    },

    doOnValueChange () {
      let value = this.currentValue
      let wrapper = this.$refs.listWrapper

      console.log(value)
      console.log(wrapper)
    },

    doOnValuesChange () {
      console.log('values changed')
    }
  },

  watch: {
    values (val) {
      this.mutatingValues = val
    },

    mutatingValues (val) {
      if (this.valueIndex === -1) {
        this.currentValue = (val || [])[0]
      }
    },

    currentValue (val) {
      this.doOnValueChange()
      this.$emit('input', val)
      this.dispatch('picker', 'slotValueChange', this)
    }
  }
}
</script>
