import Vue from 'vue'
import '../../scss/slider.scss'
// Utils
import { getTouch } from '../../utils'

interface options extends Vue {
  $refs: {
    inner: HTMLElement
    handler: HTMLElement
  }
}

export default Vue.extend<options>().extend({
  name: 'w-slider',

  props: {
    min: {
      type: Number,
      default: 0,
      validator: (val: number) => {
        return val >= 0
      },
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
      validator: (val: number) => {
        return val > 0
      },
    },
    value: {
      type: Number,
    },
    showValue: {
      type: Boolean,
      default: true,
    },
    enableClick: {
      type: Boolean,
      default: true,
    },
    disabled: Boolean,
  },

  data () {
    return {
      handlerStartPos: 0 as number,
      sliderLeft: 0 as number,
      sliderLength: 0 as number,
    }
  },

  computed: {
    percent (): number {
      if (typeof this.value === 'undefined' || this.value === null) return 0

      return Math.floor(((this.value - this.min) / (this.max - this.min)) * 100)
    },

    stepWidth (): number {
      return (this.sliderLength * this.step) / (this.max - this.min)
    },
  },

  created (): void {
    if (this.min >= this.max) {
      throw new Error('property:max must be bigger than property:min')
    }
  },

  mounted () {
    this.sliderLeft = this.$refs.inner.offsetLeft
    this.sliderLength = this.$refs.inner.getBoundingClientRect().width
  },

  methods: {
    getHandlerStartPos (): number {
      const innerRect = this.$refs.inner.getBoundingClientRect()
      const handlerRect = this.$refs.handler.getBoundingClientRect()

      return handlerRect.left - innerRect.left
    },

    onClick (e: MouseEvent): void {
      if (this.disabled || !this.enableClick) return

      // 距初始值的目标步数
      const steps = Math.round(
        (e.clientX - this.sliderLeft) / this.stepWidth
      )

      const value = this.min + this.step * steps

      this.$emit('input', value)
      this.$emit('change', value)
    },

    touchStart (): void {
      if (this.disabled) return

      this.handlerStartPos = this.getHandlerStartPos()
    },

    touchMove (e: TouchEvent): void {
      if (this.disabled) return

      const touch = getTouch(e)

      // 距初始值的目标步数
      const steps = Math.round(
        (touch.clientX - this.sliderLeft) / this.stepWidth
      )

      let value = this.min + this.step * steps
      value = value < this.min ? this.min : value > this.max ? this.max : value

      this.$emit('input', value)
      this.$emit('change', value)
    },
  },

  render (h) {
    return (
      <div class="weui-slider-box">
        <div
          class={{
            'weui-slider': true,
            'wv-slider--disabled': this.disabled,
          }}
        >
          <div
            class="weui-slider__inner"
            ref="inner"
            onClick_prevent={(e: MouseEvent) => { this.onClick(e) }}
          >
            <div
              style={{ width: this.percent + '%' }}
              class="weui-slider__track"
            />
            <div
              style={{ left: this.percent + '%' }}
              class="weui-slider__handler"
              ref="handler"
              onTouchstart={this.touchStart}
              onTouchmove={this.touchMove}
            />
          </div>
        </div>
        {
          this.showValue &&
            <div class="weui-slider-box__value">
              {this.$slots.valueBox || this.value}
            </div>
        }
      </div>
    )
  },
})
