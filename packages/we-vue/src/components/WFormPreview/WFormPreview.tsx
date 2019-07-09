import '@/scss/form-preview.scss'

import Vue from 'vue'
import { PropValidator } from 'vue/types/options'

export default Vue.extend({
  name: 'w-form-preview',

  props: {
    title: String,
    value: String,
    dataItems: {
      type: Array,
      default: () => [],
    } as PropValidator<any[]>,
    buttons: {
      type: Array,
      default: () => [],
    } as PropValidator<any[]>,
  },

  render () {
    return (
      <div class="weui-form-preview">
        <div class="weui-form-preview__hd">
          <label class="weui-form-preview__label" domPropsInnerHTML={this.title} />
          <em class="weui-form-preview__value" domPropsInnerHTML={this.value} />
        </div>
        <div class="weui-form-preview__bd">
          {
            this.dataItems.map((item, key) => (
              <div class="weui-form-preview__item" key={key}>
                <label class="weui-form-preview__label">
                  { item.label }
                </label>
                <span class="weui-form-preview__value">
                  { item.value }
                </span>
              </div>
            ))
          }

        </div>
        <div class="weui-form-preview__ft">
          {
            this.buttons.map((button, index) => (
              <div
                key={index}
                class={[
                  'weui-form-preview__btn',
                  button.type === 'primary' ? 'weui-form-preview__btn_primary' : 'weui-form-preview__btn_default',
                ]}
                domPropsTextContent={button.text}
                onClick={() => { button.action() }}
              />
            ))
          }
        </div>
      </div>
    )
  },
})
