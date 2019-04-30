import '../../scss/cell-swipe.scss'

import { getTouch } from '../../utils'
import WCell from '../WCell'
import ClickOutside from '../../directives/click-outside'

import Vue from 'vue'
// Utils
import mixins, { ExtractVue } from '../../utils/mixins'
// Mixins
import Routable from '../../mixins/routable'

interface options extends Vue {
  $refs: {
    rightBtns: HTMLElement
  }
}

export default mixins<options &
  ExtractVue<[typeof Routable]>
>(
  Routable
).extend({
  name: 'w-cell-swipe',

  components: {
    WCell,
  },

  directives: { ClickOutside },

  props: {
    title: [String, Number],
    value: [String, Number],
    isLink: Boolean,
  },

  data () {
    return {
      startPosX: 0,
      rightWidth: 0,
      offset: 0,
      startOffset: 0,
      deltaX: 0,
      transition: '',
    }
  },

  computed: {
    style (): object {
      return {
        transition: this.transition,
        transform: `translate3d(${this.offset}px, 0px, 0px)`,
      }
    },
  },

  mounted () {
    this.rightWidth = this.$refs.rightBtns.clientWidth
  },

  methods: {
    touchStart (e: TouchEvent): void {
      const touch = getTouch(e)
      this.startPosX = touch.clientX

      this.startOffset = this.offset
      this.transition = ''
    },

    touchMove (e: TouchEvent): void {
      const touch = getTouch(e)
      this.deltaX = touch.clientX - this.startPosX

      const targetOffset = this.startOffset + this.deltaX

      this.offset =
        targetOffset > 0
          ? 0
          : targetOffset < -this.rightWidth
            ? -this.rightWidth
            : targetOffset
    },

    onTouchend (): void {
      this.transition = 'all 200ms ease'

      // when the moving distance is smaller than 20,
      // the state of the cell-swipe will recover
      if (Math.abs(this.deltaX) < 20) {
        this.offset = this.startOffset
        return
      }

      if (this.startOffset < 0 && this.deltaX > 0) {
        this.offset = 0
      } else if (this.startOffset === 0 && this.deltaX < 0) {
        this.offset = -this.rightWidth
      }
    },

    onClickOutside (): void {
      this.offset = 0
    },
  },

  render: function (h) {
    const directives = [{
      name: 'click-outside',
      arg: 'touchstart',
      value: this.onClickOutside,
    }]

    return (
      <div
        class="weui-cell weui-cell_swiped"
        {...{
          directives,
        }}
      >
        <div
          class="weui-cell__bd"
          ref="cellBd"
          onTouchstart={this.touchStart}
          onTouchmove={this.touchMove}
          onTouchend={this.onTouchend}
          onTouchcancel={this.onTouchend}
          style={this.style}
        >
          <WCell
            title={this.title}
            value={this.value}
            is-link={this.isLink}
            to={this.to}
            url={this.routeLink}
            ref="cell"
          >
            <template slot="icon">
              {this.$slots.icon}
            </template>
            {
              !this.title &&
                <template slot="bd">
                  {this.$slots.bd}
                </template>
            }
            {
              typeof this.value === 'undefined' &&
                <template slot="ft">
                  {this.$slots.ft}
                </template>
            }
          </WCell>
        </div>
        <div class="weui-cell__ft" ref="rightBtns">
          {this.$slots.right}
        </div>
      </div>
    )
  },
})
