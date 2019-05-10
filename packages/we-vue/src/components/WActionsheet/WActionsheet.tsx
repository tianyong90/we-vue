import '../../scss/actionsheet.scss'
import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

export default Vue.extend({
  name: 'w-actionsheet',

  props: {
    type: {
      type: String,
      default: 'ios',
    },
    title: String,
    actions: {
      type: Array,
      default: () => [],
    } as PropValidator<Array<any>>,
    cancelText: {
      type: String,
      default: 'Cancel',
    },
    value: Boolean,
  },

  data () {
    return {
      currentValue: this.value as boolean,
    }
  },

  watch: {
    currentValue (val) {
      this.$emit('input', val)
    },

    value (val) {
      this.currentValue = val
    },
  },

  methods: {
    itemClick (item: any): void {
      if (item.method && typeof item.method === 'function') {
        item.method()
      }
      this.currentValue = false
    },
  },

  render (): VNode {
    const actionsheetMenu = () => (
      <div class="weui-actionsheet__menu">
        {
          this.actions.map(item => (
            <div
              key={item.name}
              class="weui-actionsheet__cell"
              onClick={() => this.itemClick(item)}
              domPropsTextContent={item.name}
            />
          ))
        }
      </div>
    )

    if (this.type === 'ios') {
      return (
        <div>
          <transition
            enter-active-class="weui-animate-fade-in"
            leave-active-class="weui-animate-fade-out"
          >
            <div
              class="weui-mask weui-animate-fade-in"
              vShow={this.currentValue}
              onClick={() => {
                this.currentValue = false
              }}
            />
          </transition>
          <transition
            enter-active-class="weui-animate-slide-up"
            leave-active-class="weui-animate-slide-down"
          >
            <div
              class="weui-actionsheet weui-actionsheet_toggle"
              vShow={this.currentValue}
            >
              {
                this.title &&
                  <div class="weui-actionsheet__title">
                    <p class="weui-actionsheet__title-text" domPropsInnerHTML={this.title}/>
                  </div>
              }
              {actionsheetMenu()}
              {
                this.cancelText &&
                  <div class="weui-actionsheet__action">
                    <div
                      class="weui-actionsheet__cell"
                      onClick={() => {
                        this.currentValue = false
                      }}
                      domPropsInnerHTML={this.cancelText}
                    />
                  </div>
              }
            </div>
          </transition>
        </div>
      )
    } else {
      return (
        <div>
          <transition
            enter-active-class="weui-animate-fade-in"
            leave-active-class="weui-animate-fade-out"
          >
            <div
              class="weui-skin_android"
              vShow={this.currentValue}
            >
              <div
                class="weui-mask"
                onClick={() => {
                  this.currentValue = false
                }}
              />
              <div class="weui-actionsheet">
                {actionsheetMenu()}
              </div>
            </div>
          </transition>
        </div>
      )
    }
  },
})
