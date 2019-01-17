import Vue from 'vue'
import '../../scss/switch.scss'

import { getTouch } from '../../utils'
import Cell from '../cell/index'

// 开关的行程
const THUMB_STROKE = 20

export default Vue.extend({
  name: 'wv-switch',

  components: {
    Cell,
  },

  props: {
    title: String,
    disabled: Boolean,
    isInCell: {
      type: Boolean,
      default: true,
    },
    value: Boolean,
  },

  data () {
    return {
      currentValue: this.value,
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
    this.offset = this.currentValue ? THUMB_STROKE : 0
  },

  methods: {
    onClick (e: MouseEvent): void {
      e.preventDefault()
      if (this.disabled) return

      this.currentValue = !this.currentValue
    },

    onTouchstart (e: TouchEvent): void {
      if (this.disabled) return

      const touch = getTouch(e)

      this.startX = touch.clientX
      this.startOffset = this.offset
      this.transition = ''
    },

    onTouchmove (e: TouchEvent): void {
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
      if (this.currentValue) {
        if (deltaX < THUMB_STROKE / -2) {
          this.currentValue = false
        } else {
          this.offset = THUMB_STROKE
        }
      } else {
        if (deltaX > THUMB_STROKE / 2) {
          this.currentValue = true
        } else {
          this.offset = 0
        }
      }
    },
  },

  watch: {
    value (val) {
      this.currentValue = val
    },

    currentValue (val) {
      this.$emit('input', val)
      this.$emit('change', val)

      this.offset = val ? THUMB_STROKE : 0
    },
  },
})
