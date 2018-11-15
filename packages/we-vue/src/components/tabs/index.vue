<template>
  <div class="wv-tabs" :class="`wv-tabs--${type}`">
    <div
      ref="wrap"
      :style="wrapStyle"
      class="wv-tabs__wrap"
      :class="[
        { 'wv-tabs__wrap--scrollable': scrollable },
        { 'wv-hairline--top-bottom': type === 'line' }
      ]"
    >
      <div class="wv-tabs__nav" :class="`wv-tabs__nav--${type}`" ref="nav">
        <div v-if="type === 'line'" class="wv-tabs__line" :style="lineStyle"/>
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          ref="tabs"
          class="wv-tab"
          :class="{
            'wv-tab--active': index === currentActive,
            'wv-tab--disabled': tab.disabled
          }"
          @click="onClick(index)"
        >
          <span class="wv-ellipsis" ref="title">{{ tab.title }}</span>
        </div>
      </div>
    </div>
    <div class="wv-tabs__content" ref="content">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * tabs 及 tab 组件代码移植自 youzan/vant
 */

import { raf } from '../../utils/raf'
import { on, off } from '../../utils/event'
import scrollUtils from '../../utils/scroll'
import Touch from '../../mixins/touch'

import Vue from 'vue'

export default Vue.extend({
  name: 'wv-tabs',

  mixins: [Touch],

  model: {
    prop: 'active'
  },

  props: {
    sticky: Boolean,
    lineWidth: Number,
    swipeable: Boolean,
    active: {
      type: [Number, String],
      default: 0
    },
    type: {
      type: String,
      default: 'line'
    },
    duration: {
      type: Number,
      default: 0.2
    },
    swipeThreshold: {
      type: Number,
      default: 4
    },
    offsetTop: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      tabs: [],
      position: '',
      currentActive: null,
      lineStyle: {},
      events: {
        resize: false,
        sticky: false,
        swipeable: false
      }
    }
  },

  computed: {
    // whether the nav is scrollable
    scrollable () {
      return this.tabs.length > this.swipeThreshold
    },

    wrapStyle () {
      switch (this.position) {
        case 'top':
          return {
            top: this.offsetTop + 'px',
            position: 'fixed'
          }
        case 'bottom':
          return {
            top: 'auto',
            bottom: 0
          }
        default:
          return null
      }
    }
  },

  watch: {
    active (val) {
      if (val !== this.currentActive) {
        this.correctActive(val)
      }
    },

    tabs () {
      this.correctActive(this.currentActive || this.active)
      this.scrollIntoView()
      this.setLine()
    },

    currentActive () {
      this.scrollIntoView()
      this.setLine()

      // scroll to correct position
      if (this.position === 'page-top' || this.position === 'content-bottom') {
        scrollUtils.setScrollTop(window, scrollUtils.getElementTop(this.$el))
      }
    },

    sticky () {
      this.handlers(true)
    },

    swipeable () {
      this.handlers(true)
    }
  },

  mounted () {
    this.correctActive(this.active)
    this.setLine()

    this.$nextTick(() => {
      this.handlers(true)
      this.scrollIntoView(true)
    })
  },

  activated () {
    this.$nextTick(() => {
      this.handlers(true)
      this.scrollIntoView(true)
    })
  },

  deactivated () {
    this.handlers(false)
  },

  beforeDestroy () {
    this.handlers(false)
  },

  methods: {
    // whether to bind sticky listener
    handlers (bind) {
      const { events } = this
      const sticky = this.sticky && bind
      const swipeable = this.swipeable && bind

      // listen to window resize event
      if (events.resize !== bind) {
        events.resize = bind
        ;(bind ? on : off)(window, 'resize', this.setLine, true)
      }

      // listen to scroll event
      if (events.sticky !== sticky) {
        events.sticky = sticky
        this.scrollEl =
          this.scrollEl || scrollUtils.getScrollEventTarget(this.$el)
        ;(sticky ? on : off)(this.scrollEl, 'scroll', this.onScroll, true)
        this.onScroll()
      }

      // listen to touch event
      if (events.swipeable !== swipeable) {
        events.swipeable = swipeable
        const { content } = this.$refs
        const action = swipeable ? on : off

        action(content, 'touchstart', this.touchStart)
        action(content, 'touchmove', this.touchMove)
        action(content, 'touchend', this.onTouchEnd)
        action(content, 'touchcancel', this.onTouchEnd)
      }
    },

    // watch swipe touch end
    onTouchEnd () {
      const { direction, deltaX, currentActive } = this
      const minSwipeDistance = 50

      /* istanbul ignore else */
      if (direction === 'horizontal' && this.offsetX >= minSwipeDistance) {
        /* istanbul ignore else */
        if (deltaX > 0 && currentActive !== 0) {
          this.setCurActive(currentActive - 1)
        } else if (deltaX < 0 && currentActive !== this.tabs.length - 1) {
          this.setCurActive(currentActive + 1)
        }
      }
    },

    // adjust tab position
    onScroll () {
      const scrollTop = scrollUtils.getScrollTop(window) + this.offsetTop
      const elTopToPageTop = scrollUtils.getElementTop(this.$el)
      const elBottomToPageTop =
        elTopToPageTop + this.$el.offsetHeight - this.$refs.wrap.offsetHeight
      if (scrollTop > elBottomToPageTop) {
        this.position = 'bottom'
      } else if (scrollTop > elTopToPageTop) {
        this.position = 'top'
      } else {
        this.position = ''
      }
    },

    // update nav bar style
    setLine () {
      this.$nextTick(() => {
        if (!this.$refs.tabs || this.type !== 'line') {
          return
        }

        const tab = this.$refs.tabs[this.currentActive]
        const width = this.lineWidth || tab.offsetWidth
        const left = tab.offsetLeft + (tab.offsetWidth - width) / 2

        this.lineStyle = {
          width: `${width}px`,
          transform: `translateX(${left}px)`,
          transitionDuration: `${this.duration}s`
        }
      })
    },

    // correct the value of active
    correctActive (active) {
      active = +active
      const exist = this.tabs.some(tab => tab.index === active)
      const defaultActive = (this.tabs[0] || {}).index || 0
      this.setCurActive(exist ? active : defaultActive)
    },

    setCurActive (active) {
      if (active !== this.currentActive) {
        this.$emit('input', active)

        if (this.currentActive !== null) {
          this.$emit('change', active, this.tabs[active].title)
        }
        this.currentActive = active
      }
    },

    // emit event when clicked
    onClick (index) {
      const { title, disabled } = this.tabs[index]
      if (disabled) {
        this.$emit('disabled', index, title)
      } else {
        this.setCurActive(index)
        this.$emit('click', index, title)
      }
    },

    // scroll active tab into view
    scrollIntoView (immediate) {
      if (!this.scrollable || !this.$refs.tabs) {
        return
      }

      const tab = this.$refs.tabs[this.currentActive]
      const { nav } = this.$refs
      const { scrollLeft, offsetWidth: navWidth } = nav
      const { offsetLeft, offsetWidth: tabWidth } = tab

      this.scrollTo(
        nav,
        scrollLeft,
        offsetLeft - (navWidth - tabWidth) / 2,
        immediate
      )
    },

    // animate the scrollLeft of nav
    scrollTo (el, from, to, immediate) {
      if (immediate) {
        el.scrollLeft += to - from
        return
      }

      let count = 0
      const frames = Math.round((this.duration * 1000) / 16)
      const animate = () => {
        el.scrollLeft += (to - from) / frames
        /* istanbul ignore next */
        if (++count < frames) {
          raf(animate)
        }
      }
      animate()
    },

    // render title slot of child tab
    renderTitle (el, index) {
      this.$nextTick(() => {
        const title = this.$refs.title[index]
        title.parentNode.replaceChild(el, title)
      })
    }
  }
})
</script>
