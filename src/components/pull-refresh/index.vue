<template>
  <div class="weui-pull-refresh">
    <div :class="['weui-pull-box', !isMove ? 'endAnimal' : '']" ref="scrollBox">
      <div class="weui-pull-refreshing-box">
        <div v-if="!isLoading">{{ tipText }}</div>
        <div v-else-if="isLoading && moveDistance > 50"><i class="weui-loading"/> 加载中...</div>
      </div>
      <div class="weui-pull-present-box">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import { create } from '../../utils'
import { off, on } from '../../utils/event'

export default create({
  name: 'wv-pull-refresh',
  data () {
    return {
      startY: '',
      endY: '',
      moveDistance: 0,
      isMove: false,
      tipText: '下拉即可刷新...'
    }
  },
  computed: {
    isLoading: {
      get () {
        return this.value
      },
      set (bool) {
        this.$emit('input', bool)
        return bool
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.bindTouchEvent()
  },
  methods: {
    bindTouchEvent () {
      let el = this.$refs.scrollBox
      on(el, 'touchstart', this.touchStart)
      on(el, 'touchmove', this.touchMove)
      on(el, 'touchend', this.touchEnd)
    },
    touchStart (e) {
      this.startY = e.targetTouches[0].clientY
    },
    touchMove (e) {
      let move = e.targetTouches[0].clientY - this.startY
      this.isMove = true
      if (this.$refs.scrollBox.scrollTop === 0 && move > 0) {
        let diff = e.targetTouches[0].clientY - this.startY
        this.moveDistance = Math.pow(diff, 0.8)
        this.$refs.scrollBox.style.transform = `translate3d(0, ${this.moveDistance}px, 0)`
        if (this.moveDistance > 50) {
          this.tipText = '释放即可刷新...'
        } else {
          this.tipText = '下拉即可刷新...'
        }
      }
    },
    touchEnd (e) {
      this.isMove = false
      this.tipText = ''
      if (this.moveDistance > 50) {
        this.$refs.scrollBox.style.transform = `translate3d(0, 50px, 0)`
        this.isLoading = true
        this.$emit('refresh')
      } else {
        this.$refs.scrollBox.style.transform = `translate3d(0, 0px, 0)`
      }
    },
    animateEnd () {
      this.$refs.scrollBox.style.transition = null
    }
  },
  watch: {
    value (val) {
      if (!val) {
        let scrollBox = this.$refs.scrollBox
        scrollBox.style.transform = `translate3d(0, 0px, 0)`
      }
    }
  }
})
</script>

<style scoped lang="scss">
.weui-pull-refresh {
  margin-top:-50px;
    .weui-pull-box {
        height: calc(100vh - 50px);
        .weui-pull-refreshing-box {
            line-height: 50px;
            height: 50px;
            font-size: 14px;
            color: rgba(69,90,100,.6);
            text-align: center;
            margin-bottom:20px;
        }
        .weui-pull-present-box {
            background-color: lighten(#fff, 10%);
        }
    }
}
.endAnimal{
  transition: all .3s ease;
}
</style>
