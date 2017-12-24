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
           :class="{ 'weui-picker__item_disabled': isDisabled(option) }"
           v-for="(option, index) in options"
           :key="index"
           v-text="getOptionText(option)"
      />
    </div>
  </div>
  <div class="wv-picker-slot-divider" v-else v-html="content" />
</template>

<script>
  import { create, getTouch } from '../../utils'
  const range = (num, min, max) => Math.min(Math.max(num, min), max)

  // 每个选项高度
  const ITEM_HEIGHT = 34
  // 可见选项个数
  const VISIBLE_ITEM_COUNT = 7

  export default create({
    name: 'wv-picker-slot',

    props: {
      options: {
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
        startTime: null,
        startY: 0,
        startOffset: 0,
        offset: 0,
        prevY: 0,
        prevTime: null,
        velocity: 0, // 滑动的速度
        transition: '',
        currentIndex: this.defaultIndex
      }
    },

    computed: {
      minTranslateY () {
        return ITEM_HEIGHT * (Math.ceil(VISIBLE_ITEM_COUNT / 2) - this.options.length)
      },

      maxTranslateY () {
        return ITEM_HEIGHT * Math.floor(VISIBLE_ITEM_COUNT / 2)
      },

      wrapperStyle () {
        return {
          transition: this.transition,
          transform: `translate3d(0, ${this.offset}px, 0)`
        }
      },

      count () {
        return this.options.length
      },

      currentValue () {
        return this.options[this.currentIndex]
      }
    },

    created () {
      this.$parent && this.$parent.children.push(this)
    },

    mounted () {
      this.setIndex(this.currentIndex)
    },

    destroyed () {
      this.$parent && this.$parent.children.splice(this.$parent.children.indexOf(this), 1)
    },

    methods: {
      getOptionText (item) {
        if (typeof item === 'string') {
          return item
        } else {
          return item[this.valueKey]
        }
      },

      isDisabled (item) {
        return typeof item === 'object' && item.disabled
      },

      indexToOffset (index) {
        const baseOffset = Math.floor(VISIBLE_ITEM_COUNT / 2)
        return (index - baseOffset) * -ITEM_HEIGHT
      },

      offsetToIndex (offset) {
        offset = Math.round(offset / ITEM_HEIGHT) * ITEM_HEIGHT
        return -(offset - Math.floor(VISIBLE_ITEM_COUNT / 2) * ITEM_HEIGHT) / ITEM_HEIGHT
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
          this.offset = range(targetOffset, this.minTranslateY, this.maxTranslateY)

          this.currentIndex = this.offsetToIndex(this.offset)
          return
        }

        let endOffset = this.offset + this.velocity * 150

        this.$nextTick(() => {
          endOffset = Math.round(endOffset / ITEM_HEIGHT) * ITEM_HEIGHT

          // 不要超过最大最小流动范围
          this.offset = range(endOffset, this.minTranslateY, this.maxTranslateY)

          this.currentIndex = this.offsetToIndex(this.offset)
        })
      },

      adjustIndex (index) {
        index = range(index, 0, this.count)
        for (let i = index; i < this.count; i++) {
          if (!this.isDisabled(this.options[i])) return i
        }
        for (let i = index - 1; i >= 0; i--) {
          if (!this.isDisabled(this.options[i])) return i
        }
      },

      setIndex (index) {
        index = this.adjustIndex(index)
        this.offset = this.indexToOffset(index)
        this.currentIndex = index
      },

      setValue (value) {
        const {options} = this
        const index = options.findIndex(option => {
          return this.getOptionText(option) === value
        })
        this.setIndex(index)
      }
    },

    watch: {
      defaultIndex (index) {
        this.setIndex(index)
      },

      options (val, oldValue) {
        if (JSON.stringify(val) !== JSON.stringify(oldValue)) {
          this.setIndex(this.defaultIndex)
        }
      },

      currentIndex (index) {
        if (this.divider) return
        this.$emit('change', index)
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
