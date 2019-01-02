<template>
  <div
    class="weui-pull-refresh"
    ref="scrollBox"
    :style="style"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd">
    <div class="weui-pull-refreshing-box">
      <div v-if="moveState < 2">{{ moveState === 0 ? '下拉即可刷新...' : '释放即可刷新...' }}</div>
      <div v-else><i class="weui-loading"/> 加载中...</div>
    </div>
    <div class="weui-pull-present-box">
      <slot/>
    </div>
  </div>
</template>

<script>
import { create } from '../../utils'

export default create({
  name: 'pull-refresh',
  data () {
    return {
      startY: '',
      moveDistance: 0,
      moveState: 0,
      duration: 0
    }
  },
  computed: {
    style () {
      return {
        transition: `${this.duration}ms`,
        transform: `translate3d(0,${this.moveDistance}px, 0)`
      }
    }
  },
  methods: {
    touchStart (e) {
      this.duration = 0
      this.moveDistance = 0
      this.startY = e.targetTouches[0].clientY
    },
    touchMove (e) {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 0) return
      let move = e.targetTouches[0].clientY - this.startY
      if (move > 0) {
        e.preventDefault()
        let diff = e.targetTouches[0].clientY - this.startY
        this.moveDistance = Math.pow(diff, 0.8)
        if (this.moveDistance > 50) {
          if (this.moveState === 1) return
          this.moveState = 1
        } else {
          if (this.moveState === 0) return
          this.moveState = 0
        }
      }
    },
    touchEnd (e) {
      this.duration = 300
      if (this.moveDistance > 50) {
        this.moveState = 2
        this.moveDistance = 50
        this.$emit('refresh', () => {
          this.moveState = 0
        })
      } else {
        this.moveDistance = 0
      }
    }
  },
  watch: {
    moveState (state) {
      if (state === 0 && this.duration === 300) {
        this.moveDistance = 0
      }
    }
  }
})
</script>

<style scoped lang="scss">
  .weui-pull-refresh {
      display: flex;
      height: calc(100vh - 50px);
      flex-direction: column;
      margin-top: -50px;
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
</style>
