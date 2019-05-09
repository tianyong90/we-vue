import Vue from 'vue'
import '../../scss/textarea.scss'

export default Vue.extend({
  name: 'w-textarea',

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

  watch: {
    value (val) {
      // 有最大字数限制时对超出限制部分进行截取
      if (this.maxLength && val.length > this.maxLength) {
        val = val.slice(0, this.maxLength)
      }

      this.lazyValue = val
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

  render () {
    return (
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea
            onChange={this.$emit('change', this.internalValue)}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            class="weui-textarea"
            ref="rextarea"
            placeholder={this.placeholder}
            rows={this.rows}
            disabled={this.disabled}
            readonly={this.readonly}
            vModel={this.internalValue}
          />
          {
            this.showCounter &&
              <div class="weui-textarea-counter">
                { `${this.length}/${this.maxLength}` }
              </div>
          }
        </div>
      </div>
    )
  },
})
