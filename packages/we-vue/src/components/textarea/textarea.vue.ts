import '../../scss/textarea.scss'

// Utils
import mixins from '../../utils/mixins'

// Mixins
import Colorable from '../../mixins/colorable'

export default mixins(
  Colorable
).extend({
  name: 'wv-textarea',

  props: {
    placeholder: String,
    showCounter: {
      type: Boolean,
      default: true,
    },
    rows: {
      type: [Number, String],
      default: 3,
    },
    maxLength: {
      type: [Number, String],
      default: 100,
    },
    disabled: Boolean,
    readonly: Boolean,
    value: {
      type: String,
      default: '',
    },
  },

  data () {
    return {
      lazyValue: this.value as string,
    }
  },

  computed: {
    length (): number {
      return this.lazyValue ? this.lazyValue.length : 0
    },

    internalValue: {
      get (): string {
        return this.lazyValue
      },
      set (val: any) {
        this.lazyValue = val
        this.$emit('input', val)
      },
    },
  },

  mounted () {
    if (this.maxLength && this.length > this.maxLength) {
      this.lazyValue = this.value.slice(0, this.maxLength as number)
    } else {
      this.lazyValue = this.value
    }
  },

  methods: {
    onFocus (): void {
      this.$emit('focus')
    },

    onBlur (): void {
      this.$emit('blur')
    },
  },

  watch: {
    value (val) {
      // 有最大字数限制时对超出限制部分进行截取
      if (this.maxLength && val.length > this.maxLength) {
        val = val.slice(0, this.maxLength)
      }

      this.lazyValue = val
    },
  },
})
