import Vue from 'vue'
import { isObj } from '../../utils'
import cloneDeep from 'lodash/cloneDeep'

// Types
import { PropValidator } from 'vue/types/options'

type objectOptionType = {
  disabled?: boolean
  [key: string]: any
}
type optionsType = Array<objectOptionType | string | number>

const range: (num: number, min: number, max: number) => number = (num, min, max) => Math.min(Math.max(num, min), max)

// height of th option item
const ITEM_HEIGHT: number = 34
// default transition
const DEFAULT_TRANSITION: string = 'all 150ms ease'

interface options extends Vue {
  $parent: {
    children: Array<any>
  } & Vue
}

export default Vue.extend<options>().extend({
  name: 'w-picker-column',

  props: {
    options: {
      type: Array,
      default: () => [],
    } as PropValidator<optionsType>,
    value: {},
    valueKey: String,
    visibleItemCount: {
      type: Number,
      default: 7,
      validator: (val: number) => {
        return [3, 5, 7].indexOf(val) > -1
      },
    },
    defaultIndex: {
      type: Number,
      default: 0,
    },
  },

  data () {
    return {
      startY: 0,
      startOffset: 0,
      offset: 0,
      prevY: 0,
      prevTime: null as any,
      velocity: 0, // moving velocity
      transition: '',
      currentIndex: this.defaultIndex,
    }
  },

  computed: {
    currentOptions (): Array<any> {
      return cloneDeep(this.options)
    },

    wrapperStyle (): object {
      return {
        transition: this.transition,
        transform: `translate3d(0, ${this.offset}px, 0)`,
      }
    },

    pickerIndicatorStyle (): object {
      return {
        top: Math.floor(this.visibleItemCount / 2) * ITEM_HEIGHT + 'px',
      }
    },

    pickerMaskStyle (): object {
      return {
        backgroundSize:
          '100% ' + Math.floor(this.visibleItemCount / 2) * ITEM_HEIGHT + 'px',
      }
    },

    count (): number {
      return this.currentOptions.length
    },
  },

  watch: {
    defaultIndex (value) {
      this.setIndex(value)
    },
  },

  created () {
    this.$parent.children && this.$parent.children.push(this)
    this.setIndex(this.currentIndex)
  },

  destroyed () {
    const { children } = this.$parent
    children && children.splice(children.indexOf(this), 1)
  },

  methods: {
    getOptionText (option: objectOptionType | string | number): string {
      return isObj(option) && this.valueKey in (option as any)
        ? (option as objectOptionType)[this.valueKey]
        : option
    },

    isDisabled (option: objectOptionType | string | number) {
      return isObj(option) && (option as objectOptionType).disabled
    },

    indexToOffset (index: number): number {
      const baseOffset = Math.floor(this.visibleItemCount / 2)
      return (index - baseOffset) * -ITEM_HEIGHT
    },

    offsetToIndex (offset: number): number {
      offset = Math.round(offset / ITEM_HEIGHT) * ITEM_HEIGHT

      return (
        -(offset - Math.floor(this.visibleItemCount / 2) * ITEM_HEIGHT) / ITEM_HEIGHT
      )
    },

    touchStart (event: TouchEvent): void {
      this.startOffset = this.offset
      this.startY = event.touches[0].clientY
      this.prevY = event.touches[0].clientY
      this.prevTime = new Date()
      this.transition = ''
    },

    touchMove (event: TouchEvent): void {
      const currentTime = +new Date()
      const currentY = event.touches[0].clientY
      const distance = currentY - this.startY
      this.offset = this.startOffset + distance

      // compute velocity
      this.velocity =
        (event.touches[0].clientY - this.prevY) / (currentTime - this.prevTime)
      this.prevY = currentY

      this.prevTime = currentTime
    },

    onTouchend (): void {
      this.transition = DEFAULT_TRANSITION
      const endOffset = this.offset + this.velocity * 150
      const index = this.offsetToIndex(endOffset)
      this.setIndex(index, true)
    },

    // adjust index, avoid disabled options
    adjustIndex (index: number): number {
      index = range(index, 0, this.count)
      for (let i = index; i < this.count; i++) {
        if (!this.isDisabled(this.currentOptions[i])) return i
      }
      for (let i = index - 1; i >= 0; i--) {
        if (!this.isDisabled(this.currentOptions[i])) return i
      }
      return index
    },

    setIndex (index: number, userAction: boolean = false): void {
      index = this.adjustIndex(index) || 0
      this.offset = this.indexToOffset(index)

      if (index !== this.currentIndex) {
        this.currentIndex = index
        userAction && this.$emit('change', index)
      }
    },

    getValue () {
      return this.currentOptions[this.currentIndex]
    },

    setValue (value: objectOptionType | string | number) {
      const { options } = this
      const valueIndex = options.findIndex(option => {
        if (isObj(value)) {
          return this.getOptionText(option) === (value as objectOptionType)[this.valueKey]
        } else {
          return this.getOptionText(option) === value
        }
      })
      this.setIndex(valueIndex > -1 ? valueIndex : 0)
    },
  },

  render (h) {
    return (
      <div
        class="weui-picker__group"
        onTouchstart={(e: TouchEvent) => { this.touchStart(e) }}
        onTouchmove_prevent={(e: TouchEvent) => { this.touchMove(e) }}
        onTouchend={() => { this.onTouchend() }}
        onTouchcancel={() => { this.onTouchend() }}
      >
        <div class="weui-picker__mask" style={this.pickerMaskStyle} />
        <div
          class="weui-picker__indicator"
          ref="indicator"
          style={this.pickerIndicatorStyle}
        />
        <div class="weui-picker__content" style={this.wrapperStyle}>
          {
            this.options.map((option, index) => (
              <div
                key={index}
                class={{
                  'weui-picker__item': true,
                  'weui-picker__item_disabled': this.isDisabled(option),
                }}
                domPropsInnerHTML={this.getOptionText(option)}
                onClick={() => {
                  this.setIndex(index, true)
                }}
              />
            ))
          }
        </div>
      </div>
    )
  },
})
