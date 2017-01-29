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
// 可见选项个数
const VISIBLE_ITEM_COUNT = 7

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

  created () {
    this.dragState = {}
  },

  data () {
    return {
      isDragging: false,
      mutatingValues: this.values,
      currentValue: this.value
    }
  },

  computed: {
    minTranslateY () {
      return ITEM_HEIGHT * (Math.ceil(VISIBLE_ITEM_COUNT / 2) - this.mutatingValues.length)
    },

    maxTranslateY () {
      return ITEM_HEIGHT * Math.floor(VISIBLE_ITEM_COUNT / 2)
    },

    valueIndex () {
      return this.mutatingValues.indexOf(this.currentValue)
    }
  },

  mounted () {
    this.ready = true
    this.currentValue = this.value
    this.$emit('input', this.currentValue)

    const wrapper = this.$refs.listWrapper
    Transform(wrapper, true)

    this.onValueChange()

    draggable(this.$el, {
      start: (event) => {
        this.isDragging = true
        let dragState = this.dragState

        dragState.start = new Date()
        dragState.startPositionY = event.clientY
        dragState.startTranslateY = wrapper.translateY
      },
      drag: (event) => {
        let dragState = this.dragState
        const deltaY = event.clientY - dragState.startPositionY

        const tempTranslateY = dragState.startTranslateY + deltaY

        if (tempTranslateY <= this.minTranslateY) {
          wrapper.translateY = this.minTranslateY
        } else if (tempTranslateY >= this.maxTranslateY) {
          wrapper.translateY = this.maxTranslateY
        } else {
          wrapper.translateY = dragState.startTranslateY + deltaY
        }

        dragState.currentPosifionY = event.clientY
        dragState.currentTranslateY = wrapper.translateY
        dragState.velocityTranslate = dragState.currentTranslateY - dragState.prevTranslateY

        dragState.prevTranslateY = dragState.currentTranslateY
      },
      end: (event) => {
        this.isDragging = false

        let dragState = this.dragState
        let momentumRatio = 7
        let currentTranslate = wrapper.translateY
        let duration = new Date() - dragState.start

        let momentumTranslate
        if (duration < 300) {
          momentumTranslate = currentTranslate + dragState.velocityTranslate * momentumRatio
        }

        this.$nextTick(() => {
          let translate
          if (momentumTranslate) {
            translate = Math.round(momentumTranslate / ITEM_HEIGHT) * ITEM_HEIGHT
          } else {
            translate = Math.round(currentTranslate / ITEM_HEIGHT) * ITEM_HEIGHT
          }

          translate = Math.max(Math.min(translate, this.maxTranslateY), this.minTranslateY)

          wrapper.translateY = translate
          this.currentValue = this.translate2value(translate)
        })
        this.dragState = {}
      }
    })
  },

  methods: {
    value2translate (value) {
      const values = this.mutatingValues
      const valueIndex = values.indexOf(value)
      const offset = Math.floor(VISIBLE_ITEM_COUNT / 2)

      if (valueIndex !== -1) {
        return (valueIndex - offset) * -ITEM_HEIGHT
      }
    },

    translate2value (translate) {
      translate = Math.round(translate / ITEM_HEIGHT) * ITEM_HEIGHT
      const index = -(translate - Math.floor(VISIBLE_ITEM_COUNT / 2) * ITEM_HEIGHT) / ITEM_HEIGHT

      return this.mutatingValues[index]
    },

    onValueChange () {
      let value = this.currentValue
      let wrapper = this.$refs.listWrapper

      wrapper.translateY = this.value2translate(value)
    },

    onValuesChange () {
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
      this.onValueChange()
      this.$emit('input', val)
      // this.dispatch('picker', 'slotValueChange', this)
    }
  }
}
</script>
