<template>
  <div v-show="this.value">
    <div class="weui-mask"></div>
    <div class="weui-dialog" :class="{ 'weui-skin_android': skin === 'android' }">
      <div class="weui-dialog__hd" v-if="title"><strong class="weui-dialog__title" v-html="title"></strong></div>
      <div class="weui-dialog__bd" v-html="message"></div>
      <div class="weui-dialog__ft">
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" v-if="showCancelBtn" @click="handleAction('cancel')" v-text="cancelText"></a>
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" v-if="showConfirmBtn" @click="handleAction('confirm')" v-text="confirmText"></a>
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
    }
  },

  data () {
    return {
      value: false
    }
  },

  methods: {
    handleAction (action) {
      this.value = false
      if (action === 'confirm') {
        let callback = this.callback
        callback(action)
      }
    }
  }
}
</script>
