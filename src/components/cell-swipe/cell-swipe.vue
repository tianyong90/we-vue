<template>
  <div class="weui-cell weui-cell_swiped">
    <div class="weui-cell__bd" ref="cellBd">
      <wv-cell :title="title" :value="value" :is-link="isLink" :to="to" :url="url" ref="cell">
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
  import draggable from '../../utils/draggable'
  import { getTranslateX, setTranslateX } from '../../utils/transform'
  import RouterLink from '../../mixins/router-link'

  export default {
    name: 'wv-cell-swipe',

    components: {
      [Cell.name]: Cell
    },

    mixins: [RouterLink],

    props: {
      title: {
        type: [String, Number]
      },
      value: {
        type: [String, Number]
      },
      isLink: Boolean
    },

    data () {
      return {
        dragState: {}
      }
    },

    mounted () {
      const cellBd = this.$refs.cellBd

      setTranslateX(cellBd, 0)

      draggable(cellBd, {
        start: (event) => {
          this.dragState.startPositionX = event.clientX
          this.dragState.startTranslateX = getTranslateX(cellBd)
          this.dragState.startTime = new Date()

          cellBd.style.transition = ''
        },
        drag: (event) => {
          const deltaX = event.clientX - this.dragState.startPositionX

          const btnsWidth = this.$refs.rightBtns.clientWidth

          let targetTranslateX
          if (deltaX < 0) {
            targetTranslateX = Math.abs(this.dragState.startTranslateX + deltaX) < btnsWidth ? this.dragState.startTranslateX + deltaX : -1 * btnsWidth
          } else {
            targetTranslateX = this.dragState.startTranslateX + deltaX < 0 ? this.dragState.startTranslateX + deltaX : 0
          }

          setTranslateX(cellBd, targetTranslateX)
        },
        end: (event) => {
          const btnsWidth = this.$refs.rightBtns.clientWidth

          this.dragState.endPositionX = event.clientX
          this.dragState.endTranslateX = getTranslateX(cellBd)
          this.dragState.totalDeltaX = this.dragState.endPositionX - this.dragState.startPositionX
          this.dragState.endTime = new Date()

          const touchTime = this.dragState.endTime - this.dragState.startTime

          // 500ms 内当作点击处理
          if (touchTime <= 500 && parseInt(this.dragState.totalDeltaX) === 0) {
            this.$refs.cell.$emit('CLICK_IN_CELLSWIPE')
          }

          if (this.dragState.startTranslateX === 0 && this.dragState.totalDeltaX < 0) {
            if (Math.abs(this.dragState.totalDeltaX) >= 30) {
              setTranslateX(cellBd, -btnsWidth)
            } else {
              setTranslateX(cellBd, 0)
            }
            cellBd.style.transition = 'all 200ms ease'
          } else if (this.dragState.startTranslateX === -btnsWidth && this.dragState.totalDeltaX > 0) {
            if (Math.abs(this.dragState.totalDeltaX) >= 30) {
              setTranslateX(cellBd, 0)
            } else {
              setTranslateX(cellBd, -btnsWidth)
            }
            cellBd.style.transition = 'all 200ms ease'
          }
          this.dragState = {}
        }
      })
    }
  }
</script>

<style scoped lang="scss">
</style>
