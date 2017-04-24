<template>
  <div class="weui-cell weui-cell_swiped" ref="mainCell">
    <div class="weui-cell__bd" ref="cellBd">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>{{ title }}</p>
        </div>
        <div class="weui-cell__ft">{{ value }}</div>
      </div>
    </div>
    <div class="weui-cell__ft" ref="rightBtns" slot="swipe-btns">
      <a class="weui-swiped-btn weui-swiped-btn_warn" href="javascript:">删除</a>
      <a class="weui-swiped-btn weui-swiped-btn_default" href="javascript:">查看</a>
    </div>
  </div>
</template>

<script type="text/babel">
  import draggable from '../../utils/draggable'
  import Transform from 'css3transform'

  export default {
    name: 'wv-cell-swipe',

    props: {
      title: {
        type: String | Number
      },
      value: {
        type: String | Number
      },
      isLink: Boolean,
      to: String
    },

    data () {
      return {
        style: {}
      }
    },

    computed: {
      href () {
        if (this.to && !this.added && this.$router) {
          const resolved = this.$router.match(this.to)
          if (!resolved.matched.length) return this.to

          this.$nextTick(() => {
            this.added = true
            this.$el.addEventListener('click', this.handleClick)
          })
          return resolved.path
        }
        return this.to
      }
    },

    mounted () {
      this.isDragging = false
      let dragState = {}

      const btnsWidwh = this.$refs.rightBtns.clientWidth

      const mainCell = this.$refs.mainCell
      const cellBd = this.$refs.cellBd
      Transform(cellBd, true)

      draggable(mainCell, {
        start: (event) => {
          if (this.isDragging) return
          this.isDragging = true

          dragState.startPositionX = event.clientX
          dragState.startTranslateX = cellBd.translateX

          cellBd.style.transition = ''
        },
        drag: (event) => {
          const deltaX = event.clientX - dragState.startPositionX

          let targetTranslateX
          if (deltaX < 0) {
            targetTranslateX = Math.abs(dragState.startTranslateX + deltaX) < btnsWidwh ? dragState.startTranslateX + deltaX : -1 * btnsWidwh
          } else {
            targetTranslateX = dragState.startTranslateX + deltaX < 0 ? dragState.startTranslateX + deltaX : 0
          }
          cellBd.translateX = targetTranslateX
        },
        end: (event) => {
          this.isDragging = false

          dragState.endPositionX = event.clientX
          dragState.endTranslateX = cellBd.translateX
          dragState.totalDeltaX = dragState.endPositionX - dragState.startPositionX

          if (dragState.startTranslateX === 0 && dragState.totalDeltaX < 0) {
            if (Math.abs(dragState.totalDeltaX) >= 30) {
              cellBd.translateX = -btnsWidwh
            } else {
              cellBd.translateX = 0
            }
            cellBd.style.transition = 'all 200ms ease'
          } else if (dragState.startTranslateX === -btnsWidwh && dragState.totalDeltaX > 0) {
            if (Math.abs(dragState.totalDeltaX) >= 30) {
              cellBd.translateX = 0
            } else {
              cellBd.translateX = -btnsWidwh
            }
            cellBd.style.transition = 'all 200ms ease'
          }

          dragState = {}
        }
      })
    },

    methods: {
      handleClick ($event) {
        $event.preventDefault()
        this.$router.push(this.href)
      }
    }
  }
</script>
