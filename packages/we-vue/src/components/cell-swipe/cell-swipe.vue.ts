import '../../scss/cell-swipe.scss'

import { getTouch } from '../../utils'
import WVCell from '../cell/index'
import ClickOutside from '../../directives/click-outside'

import Vue from 'vue'
// Utils
import mixins from '../../utils/mixins'
// Mixins
import Routable from '../../mixins/routable'
import { styleObject } from '../../globals'

interface options extends Vue {
  $refs: {
    rightBtns: HTMLElement
  }
}

export default mixins<options>(
  Routable
).extend({
  name: 'wv-cell-swipe',

  components: {
    WVCell,
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
    style (): styleObject {
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
    onTouchstart (e: TouchEvent): void {
      const touch = getTouch(e)
      this.startPosX = touch.clientX

      this.startOffset = this.offset
      this.transition = ''
    },

    onTouchmove (e: TouchEvent): void {
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
})
