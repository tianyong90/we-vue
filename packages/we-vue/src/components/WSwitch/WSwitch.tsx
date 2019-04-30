import '../../scss/switch.scss'

// Utils
import { getTouch } from '../../utils'
import mixins from '../../utils/mixins'

import WCell from '../WCell'

// Mixins
import Toggleable from '../../mixins/toggleable'

// 开关的行程
const THUMB_STROKE = 20

export default mixins(
  Toggleable
).extend({
  name: 'w-switch',

  components: {
    WCell,
  },

  props: {
    title: String,
    disabled: Boolean,
    isInCell: {
      type: Boolean,
      default: true,
    },
  },

  data () {
    return {
      startX: 0,
      offset: 0,
      startOffset: 0,
      transition: '',
    }
  },

  computed: {
    thumbStyle (): object {
      return {
        transition: this.transition,
        transform: `translate3d(${this.offset}px, 0, 0)`,
      }
    },
  },

  mounted () {
    this.offset = this.isActive ? THUMB_STROKE : 0
  },

  methods: {
    onClick (e: MouseEvent): void {
      e.preventDefault()
      if (this.disabled) return

      this.isActive = !this.isActive
    },

    touchStart (e: TouchEvent): void {
      if (this.disabled) return

      const touch = getTouch(e)

      this.startX = touch.clientX
      this.startOffset = this.offset
      this.transition = ''
    },

    touchMove (e: TouchEvent): void {
      if (this.disabled) return

      const touch = getTouch(e)
      const deltaX = touch.clientX - this.startX

      const targetOffset = this.startOffset + deltaX

      if (targetOffset >= 0 && targetOffset <= THUMB_STROKE) {
        this.offset = targetOffset
      } else if (targetOffset < 0) {
        this.offset = 0
      } else if (targetOffset > THUMB_STROKE) {
        this.offset = THUMB_STROKE
      }
    },

    onTouchend (e: TouchEvent): void {
      if (this.disabled) return

      const touch = getTouch(e)

      let deltaX = touch.clientX - this.startX

      this.transition =
        '-webkit-transform .35s cubic-bezier(0.4, 0.4, 0.25, 1.35)'
      if (this.isActive) {
        if (deltaX < THUMB_STROKE / -2) {
          this.isActive = false
        } else {
          this.offset = THUMB_STROKE
        }
      } else {
        if (deltaX > THUMB_STROKE / 2) {
          this.isActive = true
        } else {
          this.offset = 0
        }
      }
    },
  },

  watch: {
    isActive (val) {
      this.$emit('input', val)
      this.$emit('change', val)

      this.offset = val ? THUMB_STROKE : 0
    },
  },

  render (h) {
    if (this.isInCell) {
      return (
        <WCell title={this.title}>
          <w-switch
            is-in-cell={false}
            slot="ft"
            vModel={this.isActive}
            disabled={this.disabled}
          />
        </WCell>
      )
    } else {
      return (
        <div
          class={{
            'wv-switch': true,
            'wv-switch-on': this.isActive,
            'wv-switch-disabled': this.disabled,
          }}
          onClick={(e: MouseEvent) => { this.onClick(e) }}
        >
          <div class="background" />
          <div
            class="thumb"
            style={this.thumbStyle}
            onTouchstart={this.touchStart}
            onTouchmove={this.touchMove}
            onTouchend={this.onTouchend}
            onTouchcancel={this.onTouchend}
          />
        </div>
      )
    }
  },
})
