<template>
  <wv-popup is-modal v-show="visible">
    <div class="weui-picker__hd">
      <a href="javascript:;" class="weui-picker__action" @click="cancel">{{ cancelText }}</a>
      <a href="javascript:;" class="weui-picker__action" @click="confirm">{{ confirmText }}</a>
    </div>
    <div class="weui-picker__bd">
      <wv-picker-slot></wv-picker-slot>
      <wv-picker-slot></wv-picker-slot>
      <wv-picker-slot></wv-picker-slot>
    </div>
  </wv-popup>


</template>

<script type="text/babel">
import Popup from '../popup/index.js'
import WvPickerSlot from './picker-slot.vue'

export default {
  name: 'wv-picker',

  components: {
    WvPickerSlot,
    Popup
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
    },

    confirm () {
      this.visible = false
    }
  }
}
</script>
