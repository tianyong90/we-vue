import Vue from 'vue'
import '../../scss/input.scss'

import WvIcon from '../icon/index'

// Utils
import mixins from '../../utils/mixins'

// Mixins
import Colorable from '../../mixins/colorable'

interface options extends Vue {
  $refs: {
    input: HTMLInputElement
  }
}

export default mixins<options>(
  Colorable
).extend({
  name: 'wv-input',

  components: {
    WvIcon,
  },

  props: {
    type: {
      type: String,
      default: 'text',
    },
    label: String,
    labelWidth: {
      type: Number,
      default: 105,
    },
    placeholder: String,
    value: String,
    name: String,
    autoComplete: {
      type: String,
      default: 'off',
    },
    maxlength: Number,
    minlength: Number,
    autofocus: Boolean,
    readonly: Boolean,
    disabled: Boolean,
    required: {
      type: Boolean,
      default: false,
    },
    pattern: String,
    validateMode: {
      type: Object,
      default: () => {
        return {
          onFocus: true,
          onBlur: true,
          onChange: true,
          onInput: true,
        }
      },
    },
  },

  data () {
    return {
      active: false,
      valid: true,
      currentValue: this.value,
    }
  },

  methods: {
    // TODO: InputEvent types
    handleInput (event: any) {
      // 当有最大长度属性时，限制过长的输入
      if (this.maxlength && event.target.value.length >= this.maxlength) {
        this.currentValue = ''
        this.currentValue = event.target.value.substr(0, this.maxlength)
      } else {
        this.currentValue = event.target.value
      }

      if (
        typeof this.validateMode === 'undefined' ||
        this.validateMode.onInput !== false
      ) {
        this.validate()
      }
    },

    focus (): void {
      this.$refs.input.focus()
    },

    onFocus (): void {
      this.active = true
      this.$emit('focus')

      if (
        typeof this.validateMode === 'undefined' ||
        this.validateMode.onFocus !== false
      ) {
        this.validate()
      }
    },

    onBlur (): void {
      this.active = false
      this.$emit('blur')

      if (
        typeof this.validateMode === 'undefined' ||
        this.validateMode.onBlur !== false
      ) {
        this.validate()
      }
    },

    onChange (): void {
      this.$emit('change', this.currentValue)

      if (
        typeof this.validateMode === 'undefined' ||
        this.validateMode.onChange !== false
      ) {
        this.validate()
      }
    },

    validate (): void {
      if (this.pattern) {
        const reg = new RegExp(this.pattern)
        if (!reg.test(this.currentValue)) {
          this.valid = false
          return
        }
      }

      if (this.required && this.currentValue === '') {
        this.valid = false
        return
      }

      if (this.minlength && this.currentValue.length < this.minlength) {
        this.valid = false
        return
      }

      this.valid = true
    },
  },

  watch: {
    currentValue (val): void {
      this.$emit('input', val)
    },

    value (val): void {
      this.currentValue = val
    },
  },
})
