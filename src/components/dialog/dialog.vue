<template>
  <transition enter-active-class="weui-animate-fade-in" leave-active-class="weui-animate-fade-out">
    <div v-show="value">
      <div class="weui-mask"></div>
      <div class="weui-dialog" :class="{ 'weui-skin_android': skin === 'android' }">
        <div class="weui-dialog__hd" v-if="title"><strong class="weui-dialog__title" v-html="title"></strong></div>
        <div class="weui-dialog__bd" v-html="message"></div>
        <div class="weui-dialog__ft">
          <a class="weui-dialog__btn weui-dialog__btn_default" v-if="showCancelButton"
             @click="handleAction('cancel')" v-text="cancelButtonText"></a>
          <a class="weui-dialog__btn weui-dialog__btn_primary" v-if="showConfirmButton"
             @click="handleAction('confirm')" v-text="confirmButtonText"></a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import PopupMixin from '../../mixins/popup'

  const CONFIRM_TEXT = '确定'
  const CANCEL_TEXT = '取消'

  export default {
    name: 'wv-dialog',

    mixins: [PopupMixin],

    props: {
      skin: {
        type: String,
        default: 'ios'
      },
      title: String,
      message: String,
      confirmButtonText: {
        type: String,
        default: CONFIRM_TEXT
      },
      cancelButtonText: {
        type: String,
        default: CANCEL_TEXT
      },
      showConfirmButton: {
        type: Boolean,
        default: true
      },
      showCancelButton: {
        type: Boolean,
        default: true
      },
      callback: Function
    },

    methods: {
      handleAction (action) {
        this.$emit('input', false)
        this.$emit(action)
        this.callback && this.callback(action)
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
