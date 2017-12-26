<template>
  <transition enter-active-class="weui-animate-fade-in" leave-active-class="weui-animate-fade-out">
    <div v-show="visible">
      <div class="weui-mask"/>
      <div class="weui-dialog" :class="{ 'weui-skin_android': skin === 'android' }">
        <div class="weui-dialog__hd" v-if="title">
          <strong class="weui-dialog__title" v-html="title"/>
        </div>
        <div class="weui-dialog__bd" v-html="message"/>
        <div class="weui-dialog__ft">
          <div
            class="weui-dialog__btn weui-dialog__btn_default"
            @click="handleAction('cancel')"
            v-if="showCancelButton"
            v-text="cancelButtonText"
          />
          <div
            class="weui-dialog__btn weui-dialog__btn_primary"
            @click="handleAction('confirm')"
            v-if="showConfirmButton"
            v-text="confirmButtonText"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { create } from '../../utils'
import PopupMixin from '../../mixins/popup'

const CONFIRM_TEXT = '确定'
const CANCEL_TEXT = '取消'

export default create({
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
      this.visible = false
      this.$emit(action)
      this.callback && this.callback(action)
    }
  }
})
</script>

<style scoped lang="scss">
</style>
