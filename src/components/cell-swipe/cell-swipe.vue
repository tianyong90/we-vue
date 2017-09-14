<template>
  <div class="weui-cell weui-cell_swiped">
    <div class="weui-cell__bd" ref="cellBd" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
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

  export default {
    name: 'wv-cell-swipe',

    components: {
      Cell
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
      Transform(cellBd, true)
    },

    methods: {
      touchStart (event) {
        event.preventDefault()

        if (this.isDragging) return

        const cellBd = this.$refs.cellBd

        if (event.type === 'touchstart') {
          this.dragState.startPositionX = event.changedTouches[0].clientX
        } else {
          this.dragState.startPositionX = event.clientX
        }

        this.dragState.startTranslateX = cellBd.translateX
        this.dragState.startTimestamp = new Date()

        cellBd.style.transition = ''
      },

      touchMove (event) {
        event.preventDefault()

        this.isDragging = true

        let deltaX
        if (event.type === 'touchmove') {
          deltaX = event.changedTouches[0].clientX - this.dragState.startPositionX
        } else {
          deltaX = event.clientX - this.dragState.startPositionX
        }

        const cellBd = this.$refs.cellBd
        const btnsWidth = this.$refs.rightBtns.clientWidth

        let targetTranslateX
        if (deltaX < 0) {
          targetTranslateX = Math.abs(this.dragState.startTranslateX + deltaX) < btnsWidth ? this.dragState.startTranslateX + deltaX : -1 * btnsWidth
        } else {
          targetTranslateX = this.dragState.startTranslateX + deltaX < 0 ? this.dragState.startTranslateX + deltaX : 0
        }
        cellBd.translateX = targetTranslateX
      },

      touchEnd (event) {
        event.preventDefault()

        this.isDragging = false

        const cellBd = this.$refs.cellBd
        const btnsWidth = this.$refs.rightBtns.clientWidth

        if (event.type === 'touchend') {
          this.dragState.endPositionX = event.changedTouches[0].clientX
        } else {
          this.dragState.endPositionX = event.clientX
        }
        this.dragState.endTranslateX = cellBd.translateX
        this.dragState.totalDeltaX = this.dragState.endPositionX - this.dragState.startPositionX

        this.dragState.endTimestamp = new Date()

        const touchTime = this.dragState.endTimestamp - this.dragState.startTimestamp

        // 500ms 内当作点击处理
        if (touchTime <= 500 && parseInt(this.dragState.totalDeltaX) === 0) {
          this.$children[0].$emit('CLICK_IN_CELLSWIPE', event)
        }

        if (this.dragState.startTranslateX === 0 && this.dragState.totalDeltaX < 0) {
          if (Math.abs(this.dragState.totalDeltaX) >= 30) {
            cellBd.translateX = -btnsWidth
          } else {
            cellBd.translateX = 0
          }
          cellBd.style.transition = 'all 200ms ease'
        } else if (this.dragState.startTranslateX === -btnsWidth && this.dragState.totalDeltaX > 0) {
          if (Math.abs(this.dragState.totalDeltaX) >= 30) {
            cellBd.translateX = 0
          } else {
            cellBd.translateX = -btnsWidth
          }
          cellBd.style.transition = 'all 200ms ease'
        }
        this.dragState = {}
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
