<template>
	<div class="" v-show="visible" ref="abc">
    <div class="weui-mask weui-animate-fade-in"></div>
    <div class="weui-picker weui-animate-slide-up">
      <div class="weui-picker__hd">
        <a href="javascript:;" class="weui-picker__action" @click="cancel">{{ cancelText }}</a>
        <a href="javascript:;" data-action="select" class="weui-picker__action" id="weui-picker-confirm">{{ confirmText }}</a>
      </div>
      <div class="weui-picker__bd">
        <div class="weui-picker__group">
          <div class="weui-picker__mask"></div>
          <div class="weui-picker__indicator"></div>
          <div class="weui-picker__content" style="transform: translate3d(0px, 34px, 0px);">
            <div class="weui-picker__item">飞机票</div>
            <div class="weui-picker__item">火车票</div>
            <div class="weui-picker__item">的士票</div>
            <div class="weui-picker__item weui-picker__item_disabled">公交票 (disabled)</div>
            <div class="weui-picker__item">其他</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import AlloyFinger from 'alloyfinger'

export default {
  name: 'wv-picker',

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
      currentValue: this.value,
      af: null
    }
  },

  mounted () {
    let _this = this
    this.af = new AlloyFinger(this.$refs.abc, {
      touchMove: function (e) {
        _this.onTouchmove(e)
      },
      pressMove: function (e) {
        _this.onTouchmove(e)
      },
      touchEnd: function (e) {
        _this.onTouchend(e)
      }
    })
  },

  methods: {
    cancel () {
      this.visible = false
    },

    onTouchmove (e) {
      console.log(e)
    },

    onTouchend (e) {
      console.log(e)
    }
  }
}
</script>
