import '../../scss/swipe.scss'

import Vue from 'vue'
import { getTouch } from '../../utils'

import SwipeItem from '../swipe-item'

// Types
type SwipeItemInstance = InstanceType<typeof SwipeItem>

interface options extends Vue {
  timer: any
}

export default Vue.extend<options>().extend({
  name: 'wv-swipe',

  props: {
    height: Number,
    autoplay: Number,
    defaultIndex: {
      type: Number,
      default: 0,
    },
    showIndicators: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
    prevent: Boolean,
    noDragWhenSingle: {
      type: Boolean,
      default: true,
    },
  },

  data () {
    return {
      width: 0 as number,
      offset: 0 as number,
      startX: 0 as number,
      startY: 0 as number,
      active: 0 as number,
      deltaX: 0 as number,
      swipes: [] as Array<SwipeItemInstance>,
      direction: '' as string,
      currentDuration: 0 as number,
    }
  },

  mounted () {
    this.initialize()
  },

  destroyed () {
    clearTimeout(this.timer)
  },

  watch: {
    swipes (): void {
      this.initialize()
    },

    defaultIndex (): void {
      this.initialize()
    },
  },

  computed: {
    count (): number {
      return this.swipes.length
    },

    wrapperStyle (): object {
      let ret: any = {
        paddingLeft: this.count > 1 ? this.width + 'px' : 0,
        width: this.count > 1 ? (this.count + 2) * this.width + 'px' : '100%',
        transitionDuration: `${this.currentDuration}ms`,
        transform: `translate3d(${this.offset}px, 0, 0)`,
      }

      if (this.height) {
        ret.height = this.height + 'px'
      }

      return ret
    },

    activeIndicator (): number {
      return (this.active + this.count) % this.count
    },
  },

  methods: {
    initialize (): void {
      clearTimeout(this.timer)
      if (this.$el) {
        this.width = this.$el.getBoundingClientRect().width
      }
      this.active = this.defaultIndex
      this.currentDuration = 0
      this.offset = this.count > 1 ? -this.width * (this.active + 1) : 0
      this.swipes.forEach(swipe => {
        swipe.offset = 0
      })
      this.autoPlay()
    },

    onTouchstart (e: TouchEvent): void {
      if (this.count === 1 && this.noDragWhenSingle) {
        return
      }

      clearTimeout(this.timer)
      const touch = getTouch(e)

      this.deltaX = 0
      this.direction = ''
      this.currentDuration = 0
      this.startX = touch.clientX
      this.startY = touch.clientY

      if (this.active <= -1) {
        this.move(this.count)
      }
      if (this.active >= this.count) {
        this.move(-this.count)
      }
    },

    onTouchmove (e: TouchEvent): void {
      if (this.prevent) {
        e.preventDefault()
      }

      const touch = getTouch(e)

      this.deltaX = touch.clientX - this.startX
      const deltaY = touch.clientY - this.startY

      if (this.count === 1) {
        if (this.noDragWhenSingle) return

        this.offset = this.range(this.deltaX, [-20, 20])
      } else if (this.count > 1 && Math.abs(this.deltaX) > Math.abs(deltaY)) {
        this.move(0, this.range(this.deltaX, [-this.width, this.width]))
      }
    },

    onTouchend (): void {
      if (this.count === 1) {
        if (this.noDragWhenSingle) return

        this.offset = 0
        this.currentDuration = this.duration
      } else {
        if (this.deltaX) {
          this.move(Math.abs(this.deltaX) > 50 ? (this.deltaX > 0 ? -1 : 1) : 0)
          this.currentDuration = this.duration
        }
        this.autoPlay()
      }
    },

    move (move: number = 0, offset: number = 0): void {
      const { active, count, swipes, deltaX, width } = this

      if (move) {
        if (active === -1) {
          swipes[count - 1].offset = 0
        }
        swipes[0].offset = active === count - 1 && move > 0 ? count * width : 0

        this.active += move
      } else {
        if (active === 0) {
          swipes[count - 1].offset = deltaX > 0 ? -count * width : 0
        } else if (active === count - 1) {
          swipes[0].offset = deltaX < 0 ? count * width : 0
        }
      }
      this.offset = offset - (this.active + 1) * this.width
    },

    autoPlay (): void {
      const { autoplay } = this
      if (autoplay && this.count > 1) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.currentDuration = 0

          if (this.active >= this.count) {
            this.move(-this.count)
          }

          setTimeout(() => {
            this.currentDuration = this.duration
            this.move(1)
            this.autoPlay()
          }, 30)
        }, autoplay)
      }
    },

    range (num: number, arr: number[]): number {
      return Math.min(Math.max(num, arr[0]), arr[1])
    },
  },

  render (h) {
    return (
      <div
        class="wv-swipe"
        onTouchstart={this.onTouchstart}
        onTouchmove={this.onTouchmove}
        onTouchend={this.onTouchend}
        onTouchcancel={this.onTouchend}
      >
        <div
          style={this.wrapperStyle}
          class="wv-swipe__wrapper"
          onTransitionend={this.$emit('change', this.activeIndicator)}
        >
          {this.$slots.default}
        </div>
        {
          this.showIndicators && this.count > 1
            ? <div class="wv-swipe__indicators">
              {
                (new Array(this.count)).map(index => (
                  <i
                    key={index}
                    class={{ 'wv-swipe__indicator--active': index - 1 === this.activeIndicator }}
                  />
                ))
              }
            </div>
            : h()
        }
      </div>
    )
  },
})
