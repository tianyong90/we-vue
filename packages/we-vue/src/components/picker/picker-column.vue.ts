import Vue from 'vue'
import { isObj } from '../../utils'
import deepClone from '../../utils/deep-clone'
// Mixins
import Colorable from '../../mixins/colorable'
// Utils
import mixins from '../../utils/mixins'

// Types
import { PropValidator } from 'vue/types/options'

type objectOptionType = {
  disabled?: boolean
  [key: string]: any
}
type optionsType = Array<objectOptionType | string | number>

const range: (num: number, min: number, max: number) => number = (num, min, max) => Math.min(Math.max(num, min), max)

// height of th option item
const ITEM_HEIGHT = 34
// default transition
const DEFAULT_TRANSITION = 'all 150ms ease'

interface options extends Vue {
  $parent: {
    children: Array<any>
  } & Vue
}

export default mixins<options>(
  Colorable
).extend({
  name: 'wv-picker-column',

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
      currentOptions: deepClone(this.options) as Array<any>,
      currentIndex: this.defaultIndex,
    }
  },

  computed: {
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
        ? (<objectOptionType>option)[this.valueKey]
        : option
    },

    isDisabled (option: objectOptionType | string | number) {
      return isObj(option) && (<objectOptionType>option).disabled
    },

    indexToOffset (index: number): number {
      const baseOffset = Math.floor(this.visibleItemCount / 2)
      return (index - baseOffset) * -ITEM_HEIGHT
    },

    offsetToIndex (offset: number): number {
      offset = Math.round(offset / ITEM_HEIGHT) * ITEM_HEIGHT
      return (
        -(offset - Math.floor(this.visibleItemCount / 2) * ITEM_HEIGHT) /
        ITEM_HEIGHT
      )
    },

    onTouchstart (event: TouchEvent): void {
      this.startOffset = this.offset
      this.startY = event.touches[0].clientY
      this.prevY = event.touches[0].clientY
      this.prevTime = new Date()
      this.transition = ''
    },

    onTouchmove (event: TouchEvent): void {
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
          return this.getOptionText(option) === (<objectOptionType>value)[this.valueKey]
        } else {
          return this.getOptionText(option) === value
        }
      })
      this.setIndex(valueIndex > -1 ? valueIndex : 0)
    },
  },
})
