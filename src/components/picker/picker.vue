<template>
	<div class="" v-show="visible">
    <div class="weui-mask weui-animate-fade-in"></div>
    <div class="weui-picker weui-animate-slide-up">
      <div class="weui-picker__hd">
        <a href="javascript:;" class="weui-picker__action" @click="cancel">{{ cancelText }}</a>
        <a href="javascript:;" data-action="select" class="weui-picker__action" id="weui-picker-confirm">{{ confirmText }}</a>
      </div>
      <div class="weui-picker__bd">
        <wv-picker-slot></wv-picker-slot>
        <wv-picker-slot></wv-picker-slot>
        <wv-picker-slot></wv-picker-slot>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import WvPickerSlot from './picker-slot.vue'

export default {
  name: 'wv-picker',

  components: {
    WvPickerSlot
  },

  props: {
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    value: {}
  },

  data () {
    return {
      visible: true,
      currentValue: this.value
    }
  },

  mounted () {
  },

  methods: {
    cancel () {
      this.visible = false
    }
  }
}
</script>
