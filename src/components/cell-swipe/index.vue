<template>
  <div class="weui-cell weui-cell_swiped" v-clickoutside:touchstart="onClick">
    <div class="weui-cell__bd"
         ref="cellBd"
         @touchstart="onTouchstart"
         @touchmove="onTouchmove"
         @touchend="onTouchend"
         @touchcancel="onTouchend"
    >
      <wv-cell :title="title" :value="value" :is-link="isLink" :to="to" :url="url" ref="cell">
        <template slot="icon">
          <slot name="icon" />
        </template>
        <template slot="bd" v-if="!title">
          <slot name="bd" />
        </template>
        <template slot="ft" v-if="typeof value === 'undefined'">
          <slot name="ft" />
        </template>
      </wv-cell>
    </div>
    <div class="weui-cell__ft" ref="rightBtns">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
  import { create } from '../../utils'
  import Clickoutside from '../../utils/clickoutside'
  import Cell from '../cell/index'
  import { getTranslateX, setTranslateX } from '../../utils/transform'
  import RouterLink from '../../mixins/router-link'
  import { getTouch } from '../../utils/touches'

  export default create({
    name: 'wv-cell-swipe',

    components: {
      [Cell.name]: Cell
    },

    mixins: [RouterLink],

    directives: {
      Clickoutside
    },

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
      setTranslateX(this.$refs.cellBd, 0)
    },

    methods: {
      onTouchstart (event) {
        const touch = getTouch(event)
        this.dragState.startPositionX = touch.clientX
        this.dragState.startTranslateX = getTranslateX(this.$refs.cellBd)

        this.$refs.cellBd.style.transition = ''
      },

      onTouchmove (event) {
        const touch = getTouch(event)
        const deltaX = touch.clientX - this.dragState.startPositionX

        const btnsWidth = this.$refs.rightBtns.clientWidth

        let targetTranslateX
        if (deltaX < 0) {
          targetTranslateX = Math.abs(this.dragState.startTranslateX + deltaX) < btnsWidth ? this.dragState.startTranslateX + deltaX : -1 * btnsWidth
        } else {
          targetTranslateX = this.dragState.startTranslateX + deltaX < 0 ? this.dragState.startTranslateX + deltaX : 0
        }

        setTranslateX(this.$refs.cellBd, targetTranslateX)
      },

      onTouchend (event) {
        const touch = getTouch(event)
        const btnsWidth = this.$refs.rightBtns.clientWidth

        this.dragState.endPositionX = touch.clientX
        this.dragState.endTranslateX = getTranslateX(this.$refs.cellBd)
        this.dragState.totalDeltaX = this.dragState.endPositionX - this.dragState.startPositionX

        if (this.dragState.startTranslateX === 0 && this.dragState.totalDeltaX < 0) {
          if (Math.abs(this.dragState.totalDeltaX) >= 30) {
            setTranslateX(this.$refs.cellBd, -btnsWidth)
          } else {
            setTranslateX(this.$refs.cellBd, 0)
          }
          this.$refs.cellBd.style.transition = 'all 200ms ease'
        } else if (this.dragState.startTranslateX === -btnsWidth && this.dragState.totalDeltaX > 0) {
          if (Math.abs(this.dragState.totalDeltaX) >= 30) {
            setTranslateX(this.$refs.cellBd, 0)
          } else {
            setTranslateX(this.$refs.cellBd, -btnsWidth)
          }
          this.$refs.cellBd.style.transition = 'all 200ms ease'
        }
        this.dragState = {}
      },

      onClick (position = 'outside') {
        console.log(position)
      }
    }
  })
</script>

<style scoped lang="scss">
</style>
