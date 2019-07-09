import Vue, { VNode } from 'vue'
import '@/scss/input.scss'

import WVIcon from '../WIcon'

interface options extends Vue {
  $refs: {
    input: HTMLInputElement
  }
}

export default Vue.extend<options>().extend({
  name: 'w-input',

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
    handleInput (event: InputEvent): void {
      // 当有最大长度属性时，限制过长的输入
      if (this.maxlength && (event.target as HTMLInputElement).value.length >= this.maxlength) {
        this.currentValue = ''
        this.currentValue = (event.target as HTMLInputElement).value.substr(0, this.maxlength)
      } else {
        this.currentValue = (event.target as HTMLInputElement).value
      }

      if (typeof this.validateMode === 'undefined' || this.validateMode.onInput) {
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

  render (): VNode {
    return (
      <div
        class={{
          'weui-cell': true,
          'weui-cell_warn': !this.valid,
        }}
      >
        <div class="weui-cell__hd">
          {this.label && <label
            class="weui-label"
            domPropsInnerHTML={this.label}
            style={{ width: this.labelWidth + 'px' }}
          />}
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            ref="input"
            type={this.type}
            auto-complete={this.autoComplete}
            autofocus={this.autofocus}
            placeholder={this.placeholder}
            value={this.currentValue}
            readonly={this.readonly}
            number={this.type === 'number'}
            maxlength={this.maxlength}
            minlength={this.minlength}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
            onInput={this.handleInput}
          />
        </div>
        <div class="weui-cell__ft">
          { !this.valid && <WVIcon type="warn" /> }
          {this.$slots.ft}
        </div>
      </div>
    )
  },
})
