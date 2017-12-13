<template>
  <div class="weui-picker__group"
       v-if="!divider"
       @touchstart="onTouchstart"
       @touchmove="onTouchmove"
       @touchend="onTouchend"
       @touchcancel="onTouchend"
  >
    <div class="weui-picker__mask" />
    <div class="weui-picker__indicator" ref="indicator" />
    <div class="weui-picker__content" ref="listWrapper">
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
  import { getTranslateY, setTranslateY } from '../../utils/transform'
  import { getTouch } from '../../utils/touches'
  import { create } from '../../utils'

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
        mutatingValues: this.values
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
          // 写个顺序查找好了
          return this.mutatingValues.findIndex((val) => {
            return this.currentValue[valueKey] === val[valueKey]
          })
        } else {
          return this.mutatingValues.indexOf(this.currentValue)
        }
      }
    },

    mounted () {
      this.ready = true
      this.currentValue = this.value
      this.$emit('input', this.currentValue)

      if (this.divider) return

      this.doOnValueChange()
    },

    methods: {
      value2translate () {
        const valueIndex = this.valueIndex
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

      doOnValueChange () {
        const value = this.currentValue
        const wrapper = this.$refs.listWrapper

        if (this.divider) return

        setTranslateY(wrapper, this.value2translate(value))
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
        event.preventDefault()
        let dragState = this.dragState

        const touch = getTouch(event)

        const wrapper = this.$refs.listWrapper

        dragState.startTime = new Date()
        dragState.startPositionY = touch.clientY
        dragState.startTranslateY = getTranslateY(wrapper)

        wrapper.style.transition = ''
      },

      onTouchmove (event) {
        event.preventDefault()

        const touch = getTouch(event)

        let dragState = this.dragState
        const distance = touch.clientY - dragState.startPositionY

        const wrapper = this.$refs.listWrapper

        setTranslateY(wrapper, dragState.startTranslateY + distance)

        dragState.currentPosifionY = touch.clientY
        dragState.currentTranslateY = getTranslateY(wrapper)
        dragState.velocityTranslate = dragState.currentTranslateY - dragState.prevTranslateY // 拖动的瞬时速度
        dragState.prevTranslateY = dragState.currentTranslateY
      },

      onTouchend (event) {
        event.preventDefault()
        let dragState = this.dragState

        const touch = getTouch(event)

        const wrapper = this.$refs.listWrapper
        const indicator = this.$refs.indicator

        let momentumRatio = 7 // 惯量
        let currentTranslateY = getTranslateY(wrapper)
        let distance = Math.abs(dragState.startTranslateY - currentTranslateY)

        wrapper.style.transition = 'all 200ms ease'

        if (distance < 10) {
          // 距离小于 10 时视为点击
          let rect = indicator.getBoundingClientRect()
          let offset = Math.floor((touch.clientY - rect.top) / ITEM_HEIGHT) * ITEM_HEIGHT

          let translate = currentTranslateY - offset

          // 不要超过最大最小流动范围
          translate = Math.max(Math.min(translate, this.maxTranslateY), this.minTranslateY)

          setTranslateY(wrapper, translate)
          this.currentValue = this.translate2value(translate)
          this.dragState = {}
          return
        }

        let endTranslate
        if (typeof dragState.velocityTranslate === 'number' && Math.abs(dragState.velocityTranslate) > 5) {
          // 最终出手时的速度大于 5 时进行惯性滑动
          endTranslate = currentTranslateY + dragState.velocityTranslate * momentumRatio
        } else {
          // 出手时速率较小，不进行惯性滑动
          endTranslate = currentTranslateY
        }

        this.$nextTick(() => {
          let translate = Math.round(endTranslate / ITEM_HEIGHT) * ITEM_HEIGHT

          // 不要超过最大最小流动范围
          translate = Math.max(Math.min(translate, this.maxTranslateY), this.minTranslateY)

          setTranslateY(wrapper, translate)
          this.currentValue = this.translate2value(translate)
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
