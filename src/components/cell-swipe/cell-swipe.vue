<template>
  <div class="weui-cell weui-cell_swiped" ref="mainCell">
    <div class="weui-cell__bd" ref="cellBd">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>标题文字</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
    </div>
    <div class="weui-cell__ft" ref="rightBtns" slot="swipe-btns">
      <a class="weui-swiped-btn weui-swiped-btn_warn" href="javascript:">删除</a>
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
        style: {},
        btnsWidwh: null
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
      this.dragState = {}

      this.btnsWidwh = this.$refs.rightBtns.clientWidth

      const mainCell = this.$refs.mainCell

      Transform(mainCell, true)

      draggable(mainCell, {
        start: (event) => {
          this.isDragging = true
          let dragState = this.dragState

          dragState.start = new Date()
          dragState.startPositionX = event.clientX
          dragState.startTranslateX = mainCell.translateX
        },
        drag: (event) => {
          let dragState = this.dragState
          const deltaX = event.clientX - dragState.startPositionX

          if (Math.abs(deltaX) <= this.btnsWidwh) {
            console.log(deltaX)
            this.$refs.cellBd.translateX = -68
          }

//          const tempTranslateY = dragState.startTranslateY + deltaY
//
//          if (tempTranslateY <= this.minTranslateY) {
//            wrapper.translateY = this.minTranslateY
//          } else if (tempTranslateY >= this.maxTranslateY) {
//            wrapper.translateY = this.maxTranslateY
//          } else {
//            wrapper.translateY = dragState.startTranslateY + deltaY
//          }
//
//          dragState.currentPosifionY = event.clientY
//          dragState.currentTranslateY = wrapper.translateY
//          dragState.velocityTranslate = dragState.currentTranslateY - dragState.prevTranslateY
//
//          dragState.prevTranslateY = dragState.currentTranslateY
        },
        end: (event) => {
          this.isDragging = false
//
//          let dragState = this.dragState
//          let momentumRatio = 7
//          let currentTranslate = wrapper.translateY
//          let duration = new Date() - dragState.start
//
//          let momentumTranslate
//          if (duration < 300) {
//            momentumTranslate = currentTranslate + dragState.velocityTranslate * momentumRatio
//          }
//
//          this.$nextTick(() => {
//            let translate
//            if (momentumTranslate) {
//              translate = Math.round(momentumTranslate / ITEM_HEIGHT) * ITEM_HEIGHT
//            } else {
//              translate = Math.round(currentTranslate / ITEM_HEIGHT) * ITEM_HEIGHT
//            }
//
//            translate = Math.max(Math.min(translate, this.maxTranslateY), this.minTranslateY)
//
//            wrapper.translateY = translate
//            this.currentValue = this.translate2value(translate)
//          })
          this.dragState = {}
        }
      })
    },

    methods: {
      haha () {
        this.style = {
          transform: 'translateX(-68px)',
          transition: 'transform 2s'
        }
      },

      handleClick ($event) {
        $event.preventDefault()
        this.$router.push(this.href)
      }
    }
  }
</script>
