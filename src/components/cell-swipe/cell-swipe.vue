<template>
  <div class="weui-cell weui-cell_swiped">
    <div class="weui-cell__bd" ref="cellBd" v-swipe:horizonal.lock="swipeConfig" @touchstart="touchStart">
      <wv-cell :title="title" :value="value" :is-link="isLink" :to="to">
        <template slot="icon">
          <slot name="icon"></slot>
        </template>
        <template slot="bd" v-if="!title">
          <slot name="bd"></slot>
        </template>
        <template slot="ft" v-if="typeof value === 'undefined'">
          <slot name="ft"></slot>
        </template>
      </wv-cell>
    </div>
    <div class="weui-cell__ft" ref="rightBtns">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  import Cell from '../cell/index'
  import Transform from 'css3transform'
  import { swipeDirective } from '../../custom/event/swipe.js'

  export default {
    name: 'wv-cell-swipe',

    components: {
      Cell
    },

    created (){
      this.swipeConfig = {
        onSwipe: this.touchMove,
        onSwipeDone: this.touchEnd
      }
    },

    props: {
      title: {
        type: [String, Number]
      },
      value: {
        type: [String, Number]
      },
      isLink: Boolean,
      to: String
    },

    data () {
      return {
        dragState: {}
      }
    },

    mounted () {
      this.isDragging = false
      const cellBd = this.$refs.cellBd
      const rightBtns = this.$refs.rightBtns
      Transform(cellBd, true)
      Transform(rightBtns, true)
    },

    methods: {
      touchStart (event) {
        if (this.isDragging) return

        const cellBd = this.$refs.cellBd
        const rightBtns = this.$refs.rightBtns

        if (event.type === 'touchstart') {
          this.dragState.startPositionX = event.changedTouches[0].clientX
        } else {
          this.dragState.startPositionX = event.clientX
        }

        this.dragState.startTranslateX = cellBd.translateX
        this.dragState.startTimestamp = new Date()

        cellBd.style.transition = ''
        rightBtns.style.transition = ''
      },

      touchMove (info) {

        this.isDragging = true

        let deltaX = info.movingX - this.dragState.startPositionX
        const cellBd = this.$refs.cellBd
        const rightBtns = this.$refs.rightBtns
        const btnsWidth = this.$refs.rightBtns.clientWidth

        let targetTranslateX
        if (deltaX < 0) {
          targetTranslateX = Math.abs(this.dragState.startTranslateX + deltaX) < btnsWidth ? this.dragState.startTranslateX + deltaX : -1 * btnsWidth
        } else {
          targetTranslateX = this.dragState.startTranslateX + deltaX < 0 ? this.dragState.startTranslateX + deltaX : 0
        }
        cellBd.translateX = targetTranslateX
        rightBtns.translateX = (targetTranslateX + btnsWidth)
      },

      touchEnd (info) {
        this.isDragging = false

        const cellBd = this.$refs.cellBd
        const rightBtns = this.$refs.rightBtns
        const btnsWidth = this.$refs.rightBtns.clientWidth

        this.dragState.endPositionX = info.movingX
        this.dragState.endTranslateX = cellBd.translateX
        this.dragState.totalDeltaX = this.dragState.endPositionX - this.dragState.startPositionX

        this.dragState.endTimestamp = new Date()

        const touchTime = this.dragState.endTimestamp - this.dragState.startTimestamp

        if (this.dragState.startTranslateX === 0 && this.dragState.totalDeltaX < 0) {
          if (Math.abs(this.dragState.totalDeltaX) >= 30) {
            cellBd.translateX = -btnsWidth
            rightBtns.translateX = 0
          } else {
            cellBd.translateX = 0
            rightBtns.translateX = btnsWidth
          }
          cellBd.style.transition = 'all 200ms ease'
          rightBtns.style.transition = 'all 200ms ease'
        } else if (this.dragState.startTranslateX === -btnsWidth && this.dragState.totalDeltaX > 0) {
          if (Math.abs(this.dragState.totalDeltaX) >= 30) {
            cellBd.translateX = 0
            rightBtns.translateX = btnsWidth
          } else {
            cellBd.translateX = -btnsWidth
            rightBtns.translateX = 0
          }
          cellBd.style.transition = 'all 200ms ease'
          rightBtns.style.transition = 'all 200ms ease'
        }
        this.dragState = {}
      }
    },

    directives: {
      swipe: swipeDirective
    }
  }
</script>

<style scoped lang="scss">
  .weui-cell_swiped{
    padding: 0;

    & > .weui-cell__ft{
      transform: translateX(100%);
    }
  }
</style>
