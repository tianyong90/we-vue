import manager from './manager'
import context from './context'
import scrollUtils from '../../utils/scroll'
import { off, on } from '../../utils/event'

export default {
  props: {
    // whether to show popup
    visible: Boolean,
    // whether to show mask
    mask: Boolean,
    // mask custom style
    maskStyle: Object,
    // mask custom class name
    maskClass: String,
    // whether to close popup when click mask
    closeOnClickMask: Boolean,
    // z-index
    zIndex: [String, Number],
    // prevent touchmove scroll
    preventScroll: Boolean,
    // prevent body scroll
    lockOnScroll: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    visible (val) {
      this[val ? 'open' : 'close']()
    }
  },

  beforeMount () {
    this._popupId = 'popup-' + context.plusKey('idSeed')
  },

  data () {
    return {
      opened: false,
      pos: {
        x: 0,
        y: 0
      }
    }
  },

  methods: {
    recordPosition (e) {
      this.pos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }
    },

    watchTouchMove (e) {
      const {pos} = this
      const dx = e.touches[0].clientX - pos.x
      const dy = e.touches[0].clientY - pos.y
      const direction = dy > 0 ? '10' : '01'
      const el = scrollUtils.getScrollEventTarget(e.target, this.$el)
      const {scrollHeight, offsetHeight, scrollTop} = el
      const isVertical = Math.abs(dx) < Math.abs(dy)

      let status = '11'

      if (scrollTop === 0) {
        status = offsetHeight >= scrollHeight ? '00' : '01'
      } else if (scrollTop + offsetHeight >= scrollHeight) {
        status = '10'
      }

      if (
        status !== '11' &&
        isVertical &&
        !(parseInt(status, 2) & parseInt(direction, 2))
      ) {
        e.preventDefault()
        e.stopPropagation()
      }
    },

    open () {
      if (this.opened || this.$isServer) {
        return
      }

      this.$emit('update:visible', true)

      // 如果属性中传入了`zIndex`，则覆盖`context`中对应的`zIndex`
      if (this.zIndex !== undefined) {
        context.zIndex = this.zIndex
      }

      if (this.mask) {
        manager.openModal(this, {
          id: this._popupId,
          dom: this.$el,
          zIndex: context.plusKey('zIndex'),
          className: this.maskClass,
          customStyle: this.maskStyle
        })

        if (this.lockOnScroll) {
          document.body.classList.add('wv-overflow-hidden')
        }
      }

      this.$el.style.zIndex = context.plusKey('zIndex')
      this.opened = true

      if (this.preventScroll) {
        on(document, 'touchstart', this.recordPosition)
        on(document, 'touchmove', this.watchTouchMove)
      }
    },

    close () {
      if (!this.opened || this.$isServer) {
        return
      }

      this.$emit('update:visible', false)
      this.opened = false
      this.doAfterClose()
    },

    doAfterClose () {
      manager.closeModal(this._popupId)

      if (this.lockOnScroll) {
        document.body.classList.remove('wv-overflow-hidden')
      }

      if (this.preventScroll) {
        off(document, 'touchstart', this.recordPosition)
        off(document, 'touchmove', this.watchTouchMove)
      }
    }
  },

  beforeDestroy () {
    this.doAfterClose()
  }
}
