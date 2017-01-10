<template>
  <div v-show="currentValue">
    <div class="weui-mask"></div>
    <div class="weui-dialog" :class="{ 'weui-skin_android': skin === 'android' }">
      <div class="weui-dialog__hd" v-if="title"><strong class="weui-dialog__title" v-html="title"></strong></div>
      <div class="weui-dialog__bd" v-html="message"></div>
      <div class="weui-dialog__ft">
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" v-if="showCancelBtn" @click="handleCancelAction">{{ cancelText }}</a>
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" v-if="showConfirmBtn" @click="handleConfirmAction">{{ confirmText }}</a>
      </div>
    </div>
	</div>
</template>

<script type="text/babel">
const CONFIRM_TEXT = '确定'
const CANCEL_TEXT = '取消'

export default {
  name: 'wv-dialog',

  props: {
    skin: {
      type: String,
      default: 'ios'
    },
    title: String,
    message: String,
    confirmText: {
      type: String,
      default: CONFIRM_TEXT
    },
    cancelText: {
      type: String,
      default: CANCEL_TEXT
    },
    showConfirmBtn: {
      type: Boolean,
      default: true
    },
    showCancelBtn: {
      type: Boolean,
      default: true
    },
    callback: {}
  },

  data () {
    return {
      currentValue: true
    }
  },

  methods: {
    handleCancelAction (e) {
      this.currentValue = false
    },

    handleConfirmAction (e) {
      console.log('confirm')

      this.currentValue = false
    }
  },

  mounted () {
    if (this.value) {
      this.currentValue = true
    }
  }
}
</script>
