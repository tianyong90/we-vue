/**
 * tabs 及 tab 组件代码移植自 youzan/vant
 */
import Vue from 'vue'

// Utils
import mixins, { ExtractVue } from '../../utils/mixins'
import { isDef } from '../../utils'
import { raf } from '../../utils/raf'
import { off, on } from '../../utils/event'
import { getScrollEventTarget, getScrollTop, setScrollTop, getElementTop } from '../../utils/scroll'

// Mixins
import Touchable from '../../mixins/touchable'

import WTab from '../WTab'

type WTabInstance = InstanceType<typeof WTab>

interface options extends Vue {
  $el: HTMLElement
  $refs: {
    wrap: HTMLElement
    title: HTMLElement[]
    nav: HTMLElement
    tabs: WTabInstance[]
    content: HTMLElement
  }
}

export default mixins<options &
  ExtractVue<[typeof Touchable]>
>(
  Touchable
).extend({
  name: 'w-tabs',

  model: {
    prop: 'active',
  },

  props: {
    sticky: Boolean,
    swipeable: Boolean,
    animated: Boolean,
    color: String,
    background: String,
    titleActiveColor: String,
    titleInactiveColor: String,
    ellipsis: {
      type: Boolean,
      default: true,
    },
    lineWidth: {
      type: Number,
      default: null,
    },
    lineHeight: {
      type: Number,
      default: null,
    },
    active: {
      type: [Number, String],
      default: 0,
    },
    type: {
      type: String,
      default: 'line',
    },
    duration: {
      type: Number,
      default: 0.2,
    },
    swipeThreshold: {
      type: Number,
      default: 4,
    },
    offsetTop: Number,
  },

  data () {
    return {
      inited: false,
      tabs: [] as Array<WTabInstance>,
      position: '' as string,
      currentActive: 0 as number,
      lineStyle: {
        backgroundColor: this.color,
      } as object,
      events: {
        resize: false,
        sticky: false,
        swipeable: false,
      },
    }
  },

  computed: {
    // whether the nav is scrollable
    scrollable (): boolean {
      return this.tabs.length > this.swipeThreshold || !this.ellipsis
    },

    wrapStyle (): object | null {
      switch (this.position) {
        case 'top':
          return {
            top: this.offsetTop + 'px',
            position: 'fixed',
          }
        case 'bottom':
          return {
            top: 'auto',
            bottom: 0,
          }
        default:
          return null
      }
    },

    navStyle (): object {
      return {
        borderColor: this.color,
        background: this.background,
      }
    },
  },

  watch: {
    active (val) {
      if (val !== this.currentActive) {
        this.correctActive(val)
      }
    },

    color () {
      this.setLine()
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
      if (this.position === 'top' || this.position === 'bottom') {
        setScrollTop(window, getElementTop(this.$el))
      }
    },

    sticky () {
      this.handlers(true)
    },

    swipeable () {
      this.handlers(true)
    },
  },

  mounted () {
    this.onShow()
  },

  /* istanbul ignore next */
  activated () {
    this.onShow()
  },

  /* istanbul ignore next */
  deactivated () {
    this.handlers(false)
  },

  beforeDestroy () {
    this.handlers(false)
  },

  methods: {
    onShow (): void {
      this.$nextTick(() => {
        this.inited = true
        this.handlers(true)
        this.scrollIntoView(true)
      })
    },

    // whether to bind sticky listener
    handlers (bind: boolean): void {
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
        const scrollEl = getScrollEventTarget(this.$el)
        ;(sticky ? on : off)(scrollEl, 'scroll', this.onScroll, true)
        this.onScroll()
      }

      // listen to touch event
      if (events.swipeable !== swipeable) {
        events.swipeable = swipeable
        const { content } = this.$refs
        const action = swipeable ? on : off

        action(content, 'touchstart', this.touchStart as EventListener)
        action(content, 'touchmove', this.touchMove as EventListener)
        action(content, 'touchend', this.onTouchend)
        action(content, 'touchcancel', this.onTouchend)
      }
    },

    // watch swipe touch end
    onTouchend (): void {
      const { direction, deltaX, currentActive } = this
      const minSwipeDistance = 50

      /* istanbul ignore else */
      if (direction === 'horizontal' && this.offsetX >= minSwipeDistance) {
        if (deltaX > 0 && currentActive !== 0) {
          this.setCurActive(currentActive - 1)
        } else if (deltaX < 0 && currentActive !== this.tabs.length - 1) {
          this.setCurActive(currentActive + 1)
        }
      }
    },

    // adjust tab position
    onScroll (): void {
      const scrollTop = getScrollTop(window) + this.offsetTop
      const elTopToPageTop = getElementTop(this.$el)
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
    setLine (): void {
      this.$nextTick(() => {
        const { tabs } = this.$refs

        if (!tabs || !tabs[this.currentActive] || this.type !== 'line') {
          return
        }

        const tab = tabs[this.currentActive] as HTMLElement
        const { lineWidth, lineHeight } = this
        const width = isDef(lineWidth) ? lineWidth : tab.offsetWidth
        const left = tab.offsetLeft + (tab.offsetWidth - width) / 2

        const lineStyle = {
          width: `${width}px`,
          backgroundColor: this.color,
          transform: `translateX(${left}px)`,
          transitionDuration: `${this.duration}s`,
        } as any

        if (isDef(lineHeight)) {
          lineStyle.height = `${lineHeight}px`
          lineStyle.borderRadius = `${lineHeight}px`
        }

        this.lineStyle = lineStyle
      })
    },

    // correct the value of active
    correctActive (active: number | string): void {
      active = +active
      const exist = this.tabs.some(tab => tab.index === active)
      const defaultActive = (this.tabs[0] || {}).index || 0
      this.setCurActive(exist ? active : defaultActive)
    },

    setCurActive (active: number): void {
      active = this.findAvailableTab(active, active < this.currentActive)
      if (active !== this.currentActive) {
        this.$emit('input', active)

        if (this.currentActive !== null) {
          this.$emit('change', active, this.tabs[active].title)
        }
        this.currentActive = active
      }
    },

    findAvailableTab (active: number, reverse: boolean): number {
      const diff = reverse ? -1 : 1
      let index: number = active

      while (index >= 0 && index < this.tabs.length) {
        if (!this.tabs[index].disabled) {
          return index
        }
        index += diff
      }
      return index
    },

    // emit event when clicked
    onClick (index: number): void {
      const { title, disabled } = this.tabs[index]

      if (disabled) {
        this.$emit('disabled', index, title)
      } else {
        this.setCurActive(index)
        this.$emit('click', index, title)
      }
    },

    // scroll active tab into view
    scrollIntoView (immediate: boolean = false): void {
      if (!this.scrollable || !this.$refs.tabs) {
        return
      }

      const tab = this.$refs.tabs[this.currentActive]
      const { nav } = this.$refs
      const { scrollLeft, offsetWidth: navWidth } = nav
      const { offsetLeft, offsetWidth: tabWidth } = tab as HTMLElement

      this.scrollTo(
        nav,
        scrollLeft,
        offsetLeft - (navWidth - tabWidth) / 2,
        immediate
      )
    },

    // animate the scrollLeft of nav
    scrollTo (el: HTMLElement, from: number, to: number, immediate: boolean): void {
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
    renderTitle (el: HTMLElement, index: number): void {
      this.$nextTick(() => {
        const title: Element = this.$refs.title[index]
        title.parentNode && title.parentNode.replaceChild(el, title)
      })
    },

    getTabStyle (item: WTabInstance, index: number): object {
      const style = {} as any
      const { color } = this
      const active = index === this.currentActive
      const isCard = this.type === 'card'

      if (color && isCard) {
        style.borderColor = color

        if (!item.disabled && !active) {
          style.color = color
        } else if (!item.disabled && active) {
          style.backgroundColor = color
        }
      }

      const titleColor = active ? this.titleActiveColor : this.titleInactiveColor
      if (titleColor) {
        style.color = titleColor
      }

      return style
    },
  },

  render (h) {
    const { type, scrollable } = this

    const Nav = this.tabs.map((tab, index) => (
      <div
        key={index}
        ref="tabs"
        refInFor
        class={{
          'wv-tab': true,
          'wv-tab--active': index === this.currentActive,
          'wv-tab--disabled': tab.disabled,
        }}
        style={this.getTabStyle(tab, index)}
        onClick={() => { this.onClick(index) }}
      >
        <span class="wv-ellipsis" ref="title" refInFor>
          { tab.title }
        </span>
      </div>
    ))

    return (
      <div
        class={[
          'wv-tabs',
          `wv-tabs--${type}`,
        ]}
      >
        <div
          ref="wrap"
          style={this.wrapStyle}
          class={{
            'wv-tabs__wrap': true,
            'wv-tabs__wrap--scrollable': scrollable,
            'wv-hairline--top-bottom': type === 'line',
          }}
        >
          <div
            ref="nav"
            class={[
              'wv-tabs__nav',
              `wv-tabs__nav--${type}`,
            ]}
            style={this.navStyle}
          >
            {type === 'line' && <div class="wv-tabs__line" style={this.lineStyle} /> }
            {Nav}
          </div>
        </div>
        <div class="wv-tabs__content" ref="content">
          {this.$slots.default}
        </div>
      </div>
    )
  },
})
