<template>
  <div class="weui-picker__group"
       v-if="!divider"
       @touchstart="onTouchstart"
       @touchmove.prevent="onTouchmove"
       @touchend="onTouchend"
       @touchcancel="onTouchend"
  >
    <div class="weui-picker__mask" />
    <div class="weui-picker__indicator" ref="indicator" />
    <div class="weui-picker__content" :style="wrapperStyle">
      <div class="weui-picker__item"
           :class="{ 'weui-picker__item_disabled': isDisabled(item) }"
           v-for="(item, index) in values"
           :key="index"
           v-text="getItemText(item)"
      />
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

    data () {
      return {
        currentValue: this.value,
        startTime: null,
        startY: 0,
        startOffset: 0,
        offset: 0,
        prevY: 0,
        prevTime: null,
        velocity: 0, // 滑动的速度
        transition: ''
      }
    },

    computed: {
      minTranslateY () {
        return ITEM_HEIGHT * (Math.ceil(VISIBLE_ITEM_COUNT / 2) - this.values.length)
      },

      maxTranslateY () {
        return ITEM_HEIGHT * Math.floor(VISIBLE_ITEM_COUNT / 2)
      },

      valueIndex () {
        const valueKey = this.valueKey
        if (this.currentValue instanceof Object) {
          return this.values.findIndex((val) => {
            return this.currentValue[valueKey] === val[valueKey]
          })
        } else {
          return this.values.indexOf(this.currentValue)
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
    },

    methods: {
      getItemText (item) {
        if (typeof item === 'string') {
          return item
        } else {
          return item[this.valueKey]
        }
      },

      isDisabled (item) {
        return typeof item === 'object' && item.disabled
      },

      valueToOffset () {
        const valueIndex = this.valueIndex
        const itemOffset = Math.floor(VISIBLE_ITEM_COUNT / 2)

        if (valueIndex !== -1) {
          return (valueIndex - itemOffset) * -ITEM_HEIGHT
        }
      },

      offsetToValue (offset) {
        offset = Math.round(offset / ITEM_HEIGHT) * ITEM_HEIGHT
        const index = -(offset - Math.floor(VISIBLE_ITEM_COUNT / 2) * ITEM_HEIGHT) / ITEM_HEIGHT

        return this.values[index]
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
        const touch = getTouch(event)

        this.startTime = new Date()
        this.startOffset = this.offset
        this.startY = touch.clientY
        this.prevY = touch.clientY
        this.prevTime = new Date()
        this.transition = ''
      },

      onTouchmove (event) {
        const touch = getTouch(event)

        const currentTime = +new Date()
        const currentY = touch.clientY

        const distance = currentY - this.startY

        this.offset = this.startOffset + distance

        // 计算速度
        this.velocity = (touch.clientY - this.prevY) / (currentTime - this.prevTime)
        this.prevY = currentY
        this.prevTime = currentTime
      },

      onTouchend (event) {
        const touch = getTouch(event)

        const indicator = this.$refs.indicator

        let distance = Math.abs(this.offset - this.startOffset)

        this.transition = 'all 150ms ease'

        if (distance < 10) {
          // 距离小于 10 时视为点击
          const indicatorRect = indicator.getBoundingClientRect()
          const clickOffset = Math.floor((touch.clientY - indicatorRect.top) / ITEM_HEIGHT) * ITEM_HEIGHT

          const targetOffset = this.offset - clickOffset

          // 不要超过最大最小流动范围
          this.offset = Math.max(Math.min(targetOffset, this.maxTranslateY), this.minTranslateY)

          this.currentValue = this.offsetToValue(this.offset)
          return
        }

        let endOffset = this.offset + this.velocity * 150

        this.$nextTick(() => {
          endOffset = Math.round(endOffset / ITEM_HEIGHT) * ITEM_HEIGHT

          // 不要超过最大最小流动范围
          this.offset = Math.max(Math.min(endOffset, this.maxTranslateY), this.minTranslateY)

          this.currentValue = this.offsetToValue(this.offset)
        })
      }
    },

    watch: {
      values (val) {
        if (this.valueIndex === -1) {
          this.currentValue = this.nearby(this.currentValue, val)
        }
      },

      currentValue (val, oldVal) {
        this.$emit('change', val, oldVal)
        if (this.divider) return

        this.offset = this.valueToOffset(val)
      },

      defaultIndex (val) {
        if ((this.values[val] !== undefined) && (this.values.length >= val + 1)) {
          this.currentValue = this.values
        }
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
