<template>
  <div class="weui-picker__group"
       v-if="!divider"
       @touchstart.prevent="onTouchstart"
       @touchmove.prevent="onTouchmove"
       @touchend.prevent="onTouchend"
       @touchcancel.prevent="onTouchend"
  >
    <div class="weui-picker__mask" />
    <div class="weui-picker__indicator" ref="indicator" />
    <div class="weui-picker__content" :style="wrapperStyle">
      <div class="weui-picker__item"
           :class="{ 'weui-picker__item_disabled': typeof item === 'object' && item['disabled'] }"
           v-for="(item, index) in mutatingValues"
           :key="index">{{ typeof item === 'object' && item[valueKey] ? item[valueKey] : item }}
      </div>
    </div>
  </div>
  <div class="wv-picker-slot-divider" v-else v-html="content" />
</template>

<script>
  import { create, getTouch } from '../../utils'

  // 每个选项高度
  const ITEM_HEIGHT = 34
  // 可见选项个数
  const VISIBLE_ITEM_COUNT = 7

  export default create({
    name: 'wv-picker-slot',

    props: {
      values: {
        type: Array,
        default: () => []
      },
      value: {},
      valueKey: String,
      defaultIndex: {
        type: Number,
        default: 0
      },
      divider: {
        type: Boolean,
        default: false
      },
      content: {}
    },

    created () {
      this.dragState = {}
    },

    data () {
      return {
        currentValue: this.value,
        mutatingValues: this.values,
        startY: 0,
        offset: 0,
        startOffset: 0,
        currentIndex: this.defaultIndex,
        transition: ''
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
        const valueKey = this.valueKey
        if (this.currentValue instanceof Object) {
          return this.mutatingValues.findIndex((val) => {
            return this.currentValue[valueKey] === val[valueKey]
          })
        } else {
          return this.mutatingValues.indexOf(this.currentValue)
        }
      },

      wrapperStyle () {
        return {
          transition: this.transition,
          transform: `translate3d(0, ${this.offset}px, 0)`
        }
      }
    },

    mounted () {
      this.currentValue = this.value
      this.$emit('input', this.currentValue)

      if (this.divider) return

      this.doOnValueChange()
    },

    methods: {
      valueToTranslate () {
        const valueIndex = this.valueIndex
        const offset = Math.floor(VISIBLE_ITEM_COUNT / 2)

        if (valueIndex !== -1) {
          return (valueIndex - offset) * -ITEM_HEIGHT
        }
      },

      translateToValue (translate) {
        translate = Math.round(translate / ITEM_HEIGHT) * ITEM_HEIGHT
        const index = -(translate - Math.floor(VISIBLE_ITEM_COUNT / 2) * ITEM_HEIGHT) / ITEM_HEIGHT

        return this.mutatingValues[index]
      },

      doOnValueChange () {
        const value = this.currentValue

        if (this.divider) return

        this.offset = this.valueToTranslate(value)
      },

      nearby (val, values) {
        let minOffset, minIndex, offset

        if (Array.isArray(values) === false) {
          return undefined
        }

        minIndex = 0
        if (typeof val === 'number') {
          minOffset = Math.abs(values[0] - val)

          values.forEach((value, i) => {
            offset = Math.abs(value - val)
            if (offset < minOffset) {
              minIndex = i
              minOffset = offset
            }
          })
          return values[minIndex]
        } else if (val instanceof Object) {
          if (typeof val.value === 'number') {
            minOffset = Math.abs(values[0].value - val.value)

            values.forEach((value, i) => {
              offset = Math.abs(value.value - val.value)
              if (offset < minOffset) {
                minIndex = i
                minOffset = offset
              }
            })
            return values[minIndex]
          }
        }
        return values[0]
      },

      onTouchstart (event) {
        let dragState = this.dragState

        const touch = getTouch(event)

        dragState.startTime = new Date()
        dragState.startPositionY = touch.clientY
        this.startOffset = this.offset

        this.transition = ''
      },

      onTouchmove (event) {
        const touch = getTouch(event)

        let dragState = this.dragState
        const distance = touch.clientY - dragState.startPositionY

        this.offset = this.startOffset + distance

        dragState.currentPosifionY = touch.clientY
        dragState.velocityTranslate = dragState.currentTranslateY - dragState.prevTranslateY // 拖动的瞬时速度
        dragState.prevTranslateY = dragState.currentTranslateY
      },

      onTouchend (event) {
        let dragState = this.dragState

        const touch = getTouch(event)

        const indicator = this.$refs.indicator

        let momentumRatio = 7 // 惯量
        let distance = Math.abs(this.offset - this.startOffset)

        this.transition = 'all 200ms ease'

        if (distance < 10) {
          // 距离小于 10 时视为点击
          const rect = indicator.getBoundingClientRect()
          const clickOffset = Math.floor((touch.clientY - rect.top) / ITEM_HEIGHT) * ITEM_HEIGHT

          const translate = this.offset - clickOffset

          // 不要超过最大最小流动范围
          this.offset = Math.max(Math.min(translate, this.maxTranslateY), this.minTranslateY)

          this.currentValue = this.translateToValue(translate)
          this.dragState = {}
          return
        }

        let endTranslate
        if (typeof dragState.velocityTranslate === 'number' && Math.abs(dragState.velocityTranslate) > 5) {
          // 最终出手时的速度大于 5 时进行惯性滑动
          endTranslate = this.offset + dragState.velocityTranslate * momentumRatio
        } else {
          // 出手时速率较小，不进行惯性滑动
          endTranslate = this.offset
        }

        this.$nextTick(() => {
          let translate = Math.round(endTranslate / ITEM_HEIGHT) * ITEM_HEIGHT

          // 不要超过最大最小流动范围
          translate = Math.max(Math.min(translate, this.maxTranslateY), this.minTranslateY)

          this.offset = translate
          this.currentValue = this.translateToValue(translate)
        })

        this.dragState = {}
      }
    },

    watch: {
      values (val) {
        this.mutatingValues = val
      },

      mutatingValues (val) {
        if (this.valueIndex === -1) {
          this.currentValue = this.nearby(this.currentValue, val)
        }
      },

      currentValue (val) {
        this.doOnValueChange()
        this.$emit('input', val)
        this.$parent.$emit('slotValueChange', this)
      }
    }
  })
</script>

<style scoped lang="scss">
  .weui-picker__group {
    z-index: 0;
    overflow: hidden;
  }

  .weui-picker__mask {
    z-index: 2;
    height: 238px;
  }

  .weui-picker__indicator {
    z-index: 3;
  }

  .weui-picker__content {
    z-index: 1;
  }

  .wv-picker-slot-divider {
    transform: translateY(106px);
  }
</style>
