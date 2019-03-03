import Vue from 'vue'
import '../../scss/radio.scss'

import { PropValidator } from 'vue/types/options'

export default Vue.extend({
  name: 'w-radio',

  props: {
    title: String,
    align: {
      type: String,
      default: 'left',
    },
    options: {
      type: Array,
      required: true,
    } as PropValidator<Array<any>>,
    value: null as any as PropValidator<any>,
  },

  data () {
    return {
      internalValue: this.value,
    }
  },

  methods: {
    onClick  (option: any): void {
      if (option.disabled) {
        return
      }
      this.internalValue = option.value || option
    },

    isChecked (option: any): boolean {
      return typeof option === 'string' ? this.internalValue === option : this.internalValue === option.value
    },
  },

  watch: {
    internalValue (val): void {
      this.$emit('input', val)
      this.$emit('change', val)
    },

    value (val): void {
      this.internalValue = val
    },
  },

  render (h) {
    return (
      <div>
        { this.title ? <div class="weui-cells__title" domPropsInnerHTML={this.title} /> : h() }
        <div class="weui-cells weui-cells_radio">
          {
            this.options.map(option => (
              <label
                key={option.label || option}
                class={{
                  'weui-cell': true,
                  'weui-check__label': true,
                  'weui-check__label-disabled': option.disabled }}
                onClick={() => {
                  this.onClick(option)
                }}
              >
                <div class="weui-cell__bd">
                  <p domPropsTextContent={option.label || option} />
                </div>
                <div class="weui-cell__ft">
                  { this.isChecked(option) ? <span class="weui-icon-checked" /> : h() }
                </div>
              </label>
            ))
          }
        </div>
      </div>
    )
  },
})
