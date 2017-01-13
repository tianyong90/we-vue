<template>
  <div class="wv-swipe" :style="{ height: height + 'px' }">
    <div class="wv-swipe-items-wrap" ref="wrap">
      <slot></slot>
    </div>
    <div class="wv-swipe-indicators" v-show="showIndicators">
      <div class="wv-swipe-indicator" v-for="(page, $index) in pages" :class="{ 'is-active': $index === index }"></div>

      <div class="wv-swipe-indicator"></div>
      <div class="wv-swipe-indicator"></div>
      <div class="wv-swipe-indicator"></div>
    </div>
  </div>
</template>

<script type="text/babel">
import AlloyFinger from 'alloyfinger'
import Transform from 'css3transform'
import { once, addClass, removeClass } from '../../utils/dom.js'

export default {
  name: 'wv-swipe',

  data () {
    return {
      ready: false,
      dragging: false,
      userScrolling: false,
      animating: false,
      index: 0,
      pages: [],
      timer: null,
      reInitTimer: null,
      noDrag: false,
      af: null
    }
  },

  props: {
    height: {
      type: Number,
      default: 180
    },
    speed: {
      type: Number,
      default: 300
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    auto: {
      type: Number,
      default: 3000
    },
    continuous: {
      type: Boolean,
      default: true
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    noDragWhenSingle: {
      type: Boolean,
      default: true
    },
    prevent: {
      type: Boolean,
      default: false
    }
  },

  mounted () {
    let _this = this
    this.af = new AlloyFinger(this.$el, {
      swipe: function (e) {
        _this.onSwipe(e)
      }
    })

    Transform(this.$refs.wrap, true)
  },

  methods: {
    swipeItemCreated () {
      if (!this.ready) return

      // clearTimeout(this.reInitTimer)
      // this.reInitTimer = setTimeout(() => {
      //   this.reInitPages()
      // }, 100)
    },

    swipeItemDestroyed () {
      if (!this.ready) return

      // clearTimeout(this.reInitTimer)
      // this.reInitTimer = setTimeout(() => {
      //   this.reInitPages()
      // }, 100)
    },

    translate (element, offset, speed, callback) {
      if (speed) {
        this.animating = true
        element.style.webkitTransition = '-webkit-transform ' + speed + 'ms ease-in-out'
        setTimeout(() => {
          element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`
        }, 50)

        var called = false

        var transitionEndCallback = () => {
          if (called) return
          called = true
          this.animating = false
          element.style.webkitTransition = ''
          element.style.webkitTransform = ''
          if (callback) {
            callback.apply(this, arguments)
          }
        }

        once(element, 'webkitTransitionEnd', transitionEndCallback)
        setTimeout(transitionEndCallback, speed + 100) // webkitTransitionEnd maybe not fire on lower version android.
      } else {
        element.style.webkitTransition = ''
        element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`
      }
    },

    reInitPages () {
      var children = this.$children
      this.noDrag = children.length === 1 && this.noDragWhenSingle

      var pages = []
      var intDefaultIndex = Math.floor(this.defaultIndex)
      var defaultIndex = (intDefaultIndex >= 0 && intDefaultIndex < children.length) ? intDefaultIndex : 0
      this.index = defaultIndex

      children.forEach(function (child, index) {
        pages.push(child.$el)

        removeClass(child.$el, 'is-active')

        if (index === defaultIndex) {
          addClass(child.$el, 'is-active')
        }
      })

      this.pages = pages
    },

    doAnimate (towards, options) {
      if (this.$children.length === 0) return
      if (!options && this.$children.length < 2) return

      var prevPage, nextPage, currentPage, pageWidth, offsetLeft
      var speed = this.speed || 300
      var index = this.index
      var pages = this.pages
      var pageCount = pages.length

      if (!options) {
        pageWidth = this.$el.clientWidth
        currentPage = pages[index]
        prevPage = pages[index - 1]
        nextPage = pages[index + 1]
        if (this.continuous && pages.length > 1) {
          if (!prevPage) {
            prevPage = pages[pages.length - 1]
          }
          if (!nextPage) {
            nextPage = pages[0]
          }
        }
        if (prevPage) {
          prevPage.style.display = 'block'
          this.translate(prevPage, -pageWidth)
        }
        if (nextPage) {
          nextPage.style.display = 'block'
          this.translate(nextPage, pageWidth)
        }
      } else {
        prevPage = options.prevPage
        currentPage = options.currentPage
        nextPage = options.nextPage
        pageWidth = options.pageWidth
        offsetLeft = options.offsetLeft
      }

      var newIndex

      var oldPage = this.$children[index].$el

      if (towards === 'prev') {
        if (index > 0) {
          newIndex = index - 1
        }
        if (this.continuous && index === 0) {
          newIndex = pageCount - 1
        }
      } else if (towards === 'next') {
        if (index < pageCount - 1) {
          newIndex = index + 1
        }
        if (this.continuous && index === pageCount - 1) {
          newIndex = 0
        }
      }

      var callback = () => {
        if (newIndex !== undefined) {
          var newPage = this.$children[newIndex].$el
          removeClass(oldPage, 'is-active')
          addClass(newPage, 'is-active')

          this.index = newIndex
        }

        if (prevPage) {
          prevPage.style.display = ''
        }

        if (nextPage) {
          nextPage.style.display = ''
        }
      }

      setTimeout(() => {
        if (towards === 'next') {
          this.translate(currentPage, -pageWidth, speed, callback)
          if (nextPage) {
            this.translate(nextPage, 0, speed)
          }
        } else if (towards === 'prev') {
          this.translate(currentPage, pageWidth, speed, callback)
          if (prevPage) {
            this.translate(prevPage, 0, speed)
          }
        } else {
          this.translate(currentPage, 0, speed, callback)
          if (typeof offsetLeft !== 'undefined') {
            if (prevPage && offsetLeft > 0) {
              this.translate(prevPage, pageWidth * -1, speed)
            }
            if (nextPage && offsetLeft < 0) {
              this.translate(nextPage, pageWidth, speed)
            }
          } else {
            if (prevPage) {
              this.translate(prevPage, pageWidth * -1, speed)
            }
            if (nextPage) {
              this.translate(nextPage, pageWidth, speed)
            }
          }
        }
      }, 10)
    },

    next () {
      this.doAnimate('next')
    },

    prev () {
      this.doAnimate('prev')
    },

    onSwipe (e) {
      if (e.direction === 'Left') {
        console.log(e.target)
        Transform(e.target, true)
        e.target.translateX = -100
        // this.prev()
      } else if (e.direction === 'Right') {
        this.$refs.wrap.translateX = 100
        // this.next()
      }
    }
  },

  destroyed () {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    if (this.reInitTimer) {
      clearTimeout(this.reInitTimer)
      this.reInitTimer = null
    }

    // 销毁使用的 AlloyFinger 实例
    if (this.af) {
      this.af = null
    }
  }
}
</script>

<style scoped lang="scss">
  .wv-swipe {
    display: block;
    overflow: hidden;
    position: relative;
    width: 100%;

    .wv-swipe-items-wrap {
      display: block;
      overflow: hidden;
      background: grey;
      width: 100%;
      height: 100%;
      transition: all .2s ease-in-out;
    }

    .wv-swipe-indicators {
      position: absolute;
      display: flex;
      justify-content: center;
      bottom: 10px;
      width: 100%;
      left: 0;

      .wv-swipe-indicator {
        display: flex;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        margin: 0 5px;
        background-color: white;
      }
    }
  }
</style>
