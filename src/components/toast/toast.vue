<template>
  <transition enter-active-class="weui-animate-fade-in" leave-active-class="weui-animate-fade-out">
    <div v-show="value">
      <div class="weui-toast"
           :class="{ 'weui-toast_text': type === 'text' }"
           :style="style"
           ref="toast">
        <wv-icon :type="icon" class="weui-icon_toast" v-if="type !== 'text'" />
        <p class="weui-toast__content" v-text="message" />
      </div>
    </div>
  </transition>
</template>

<script>
  import WvIcon from '../icon/index'
  import { create } from '../../utils'
  import PopupMixin from '../../mixins/popup'

  export default create({
    name: 'wv-toast',

    components: {
      WvIcon
    },

    mixins: [PopupMixin],

    props: {
      overlay: {
        default: true
      },
      icon: {
        type: String,
        default: 'success-no-circle'
      },
      type: {
        type: String,
        default: 'success',
        validator: (value) => {
          return ['success', 'fail', 'loading', 'text', 'html'].indexOf(value) !== -1
        }
      },
      message: {
        type: String,
        default: ''
      },
      overlayClass: {
        default: 'weui-mask_transparent'
      }
    },

    mounted () {
      console.log(this.type)
    },

    computed: {
      style () {
        if (this.type === 'text') {
          const messageLength = this.message.length + 2

          return {
            width: messageLength + 'em',
            marginLeft: '-' + (messageLength / 2) + 'em'
          }
        }

        return {}
      }
    }
  })
</script>

<style scoped lang="scss">
  .weui-icon_toast {
    font-size: 40px;
  }

  .weui-toast_text {
    width: auto;
    min-width: 0;
    min-height: 0;
    padding: .5em 0;

    .weui-toast__content {
      margin: 0;
    }
  }
</style>
