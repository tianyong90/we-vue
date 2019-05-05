import PopupMixin from '../../mixins/popup'
import mixins from '../../utils/mixins'

const CONFIRM_TEXT = '确定'
const CANCEL_TEXT = '取消'

type action = 'cancel' | 'confirm'

export default mixins(
  PopupMixin
).extend({
  name: 'w-dialog',

  props: {
    skin: {
      type: String,
      default: 'ios',
    },
    title: String,
    message: String,
    confirmButtonText: {
      type: String,
      default: CONFIRM_TEXT,
    },
    cancelButtonText: {
      type: String,
      default: CANCEL_TEXT,
    },
    showConfirmButton: {
      type: Boolean,
      default: true,
    },
    showCancelButton: {
      type: Boolean,
      default: true,
    },
    callback: Function,
    beforeClose: Function,
  },

  methods: {
    handleAction (action: action): void {
      if (this.beforeClose) {
        this.beforeClose(action, (state: boolean) => {
          if (state !== false) {
            this.onClose(action)
          }
        })
      } else {
        this.onClose(action)
      }
    },

    onClose (action: action): void {
      this.$emit('update:visible', false)
      this.$emit(action)
      this.callback && this.callback(action)
    },
  },

  render () {
    return (
      <transition-group
        enter-active-class="weui-animate-fade-in"
        leave-active-class="weui-animate-fade-out"
      >
        <div class="weui-mask" vShow={this.visible} key="mask" />
        <div
          class={{
            'weui-dialog': true,
            'weui-skin_android': this.skin === 'android',
          }}
          vShow={this.visible}
          key="dialog"
        >
          {
            this.title &&
              <div class="weui-dialog__hd">
                <strong class="weui-dialog__title" domPropsInnerHTML={this.title} />
              </div>
          }

          <div class="weui-dialog__bd" domPropsInnerHTML={this.message} />
          <div class="weui-dialog__ft">
            {
              this.showCancelButton &&
                <div
                  class="weui-dialog__btn weui-dialog__btn_default"
                  onClick={() => { this.handleAction('cancel') }}
                  domPropsTextContent={this.cancelButtonText}
                />
            }
            {
              this.showConfirmButton &&
                <div
                  class="weui-dialog__btn weui-dialog__btn_primary"
                  onClick={() => { this.handleAction('confirm') }}
                  domPropsTextContent={this.confirmButtonText}
                />
            }
          </div>
        </div>
      </transition-group>
    )
  },
})
