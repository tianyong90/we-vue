import Vue from 'vue'
import '@/scss/search-bar.scss'
import WCell from '../WCell'

import { PropValidator } from 'vue/types/options'

// Utils
import mixins, { ExtractVue } from '@/utils/mixins'

// Mixins
import Validatable from '@/mixins/validatable'

interface options extends Vue {
  $refs: {
    input: HTMLInputElement
  }
}

export default mixins<options &
  ExtractVue<[
   typeof Validatable
  ]>
>(
  Validatable,
  /* @vue/component */
).extend({
  name: 'w-search-bar',

  components: {
    WCell,
  },

  props: {
    autofocus: Boolean,
    show: Boolean,
    placeholder: {
      type: String,
      default: '搜索',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    resultTextKey: String,
    result: {
      type: Array,
    } as PropValidator<any[]>,
  },

  data () {
    return {
      currentValue: this.value,
      isActive: false,
    }
  },

  watch: {
    currentValue (val): void {
      this.$emit('input', val)
    },

    value (val): void {
      this.currentValue = val
    },
  },

  mounted () {
    if (this.autofocus) {
      this.isActive = true
    }
  },

  methods: {
    textClick (): void {
      // focus the input
      this.$refs.input.focus()
      this.isActive = true
    },

    // 清除输入
    clear (): void {
      this.currentValue = ''
      this.$refs.input.focus()
    },

    // 取消搜索
    cancel (): void {
      this.$emit('cancel')
      this.clear()
      this.isActive = false
    },
  },

  render () {
    return (
      <div>
        <div class="weui-search-bar">
          <form action="javascript:" class="weui-search-bar__form">
            <div class="weui-search-bar__box">
              <i class="weui-icon-search" />
              <input
                class="weui-search-bar__input"
                type="search"
                placeholder={this.placeholder}
                autofocus={this.autofocus}
                vModel={this.currentValue}
                ref="input"
              />
              <div class="weui-icon-clear" onClick={this.clear} />
            </div>
            <label
              class="weui-search-bar__label"
              onClick={this.textClick}
              vShow={!this.isActive}
            >
              <i class="weui-icon-search" />
              <span domPropsTextContent={this.placeholder} />
            </label>
          </form>
          <div
            class="weui-search-bar__cancel-btn"
            onClick={this.cancel}
            vShow={this.isActive}
            domPropsTextContent={this.cancelText}
          />
        </div>

        {
          this.$slots.default ||
          <div
            class="weui-cells searchbar-result"
            vShow={this.show || this.result}
          >
            {
              this.result && this.result.map((item, index) => (
                <WCell
                  key={index}
                  title={typeof item === 'object' ? item[this.resultTextKey] : item}
                  onClick={() => {
                    this.$emit('click-result', item)
                  }}
                />
              ))
            }
          </div>
        }
      </div>
    )
  },
})
