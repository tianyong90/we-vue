import Vue from 'vue'
import manager from './manager'
import context from './context'
import { getScrollEventTarget } from '../../utils/scroll'
import { off, on } from '../../utils/event'
import Touchable from '../../mixins/touchable'

// Utils
import mixins, { ExtractVue } from '../../utils/mixins'

interface options extends Vue {
  opened: boolean
}

export default mixins<options &
  ExtractVue<[typeof Touchable]>
>(
  Touchable
).extend({
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
    // prevent body scroll
    getContainer: [String, Function],
    lockScroll: {
      type: Boolean,
      default: true,
    },
    lazyRender: {
      type: Boolean,
      default: true,
    },
  },

  data () {
    return {
      inited: this.visible,
    }
  },

  computed: {
    shouldRender (): boolean {
      return this.inited || !this.lazyRender
    },
  },

  watch: {
    visible (val) {
      this.inited = this.inited || this.visible
      this[val ? 'open' : 'close']()
    },

    getContainer () {
      this.move()
    },

    mask () {
      this.renderMask()
    },
  },

  mounted () {
    if (this.getContainer) {
      this.move()
    }
    if (this.visible) {
      this.open()
    }
  },

  activated () {
    if (this.visible) {
      this.open()
    }
  },

  beforeDestroy () {
    this.close()

    if (this.getContainer && this.$parent && this.$parent.$el) {
      this.$parent.$el.appendChild(this.$el)
    }
  },

  deactivated () {
    this.close()
  },

  methods: {
    move () {
      let container
      const { getContainer } = this
      if (getContainer) {
        if (typeof getContainer === 'string') {
          container = getContainer === 'body' ? document.body : document.querySelector(getContainer)
        } else {
          container = getContainer()
        }
      } else if (this.$parent) {
        container = this.$parent.$el
      }

      if (container && container !== this.$el.parentNode) {
        container.appendChild(this.$el)
      }
    },

    open () {
      /* istanbul ignore next */
      if (this.$isServer || this.opened) {
        return
      }

      // 如果属性中传入了`zIndex`，则覆盖`context`中对应的`zIndex`
      if (this.zIndex !== undefined) {
        context.zIndex = this.zIndex as number
      }

      this.opened = true
      this.renderMask()

      if (this.lockScroll) {
        on(document, 'touchstart', this.touchStart as EventListener)
        on(document, 'touchmove', this.onThisTouchmove as EventListener)
      }

      if (!context.lockCount) {
        document.body.classList.add('wv-overflow-hidden')
      }
      context.lockCount++

      this.$emit('update:visible', true)
    },

    close () {
      if (!this.opened) {
        return
      }

      if (this.lockScroll) {
        context.lockCount--

        off(document, 'touchstart', this.touchStart as EventListener)
        off(document, 'touchmove', this.onThisTouchmove as EventListener)

        if (!context.lockCount) {
          document.body.classList.remove('wv-overflow-hidden')
        }
      }

      this.opened = false
      manager.close(this)
      this.$emit('update:visible', false)
    },

    onThisTouchmove (e: TouchEvent): void {
      this.touchMove(e)

      const direction = this.deltaY > 0 ? '10' : '01'
      const el = getScrollEventTarget(e.target as HTMLElement, this.$el as HTMLElement)
      const { scrollHeight, offsetHeight, scrollTop } = el as HTMLElement

      let status = '11'

      /* istanbul ignore next */
      if (scrollTop === 0) {
        status = offsetHeight >= scrollHeight ? '00' : '01'
      } else if (scrollTop + offsetHeight >= scrollHeight) {
        status = '10'
      }

      if (
        status !== '11' &&
        this.direction === 'vertical' &&
        !(parseInt(status, 2) & parseInt(direction, 2))
      ) {
        e.preventDefault()
        e.stopPropagation()
      }
    },

    renderMask () {
      if (this.mask) {
        manager.open(this, {
          zIndex: context.zIndex++,
          className: this.maskClass,
          customStyle: this.maskStyle,
        })
      } else {
        manager.close(this)
      }

      this.$nextTick(() => {
        (this.$el as HTMLElement).style.zIndex = (context.zIndex++).toString()
      })
    },
  },
})
