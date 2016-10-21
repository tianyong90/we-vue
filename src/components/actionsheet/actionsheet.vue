<template>
  <div id="actionSheet_wrap">
    <div class="weui-mask_transparent actionsheet__mask actionsheet__mask_show" id="mask" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1); background-color: rgba(0, 0, 0, 0.6);"
      v-show="visible" @click="visible = false"></div>
    <div class="weui-actionsheet weui-actionsheet_toggle" id="weui-actionsheet" v-if="type === 'ios'" v-show="visible">
      <div class="weui-actionsheet__menu">
        <div class="weui-actionsheet__cell" v-for="item in actions" @click="itemClick(item)">{{ item.name }}</div>
      </div>
      <div class="weui-actionsheet__action" v-if="showCancel">
        <div class="weui-actionsheet__cell" id="actionsheet_cancel" @click="visible = false">{{ cancelText }}</div>
      </div>
    </div>

    <div class="weui-skin_android" id="weui-android-actionsheet" v-if="type === 'android'" v-show="visible">
      <div class="weui-mask" @click="visible = false"></div>
      <div class="weui-actionsheet">
        <div class="weui-actionsheet__menu">
          <div v-for="item in actions" class="weui-actionsheet__cell" @click="itemClick(item)">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'weui/dist/style/weui.min.css'

export default {
  name: 'vui-actionsheet',

  props: {
    type: {
      type: String,
      default: 'ios'
    },
    actions: {
      type: Array,
      default: () => []
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    visible: Boolean
  },

  methods: {
    itemClick (item) {
      if (item.method && typeof item.method === 'function') {
        item.method()
      }
      this.visible = false
    }
  }
}
</script>