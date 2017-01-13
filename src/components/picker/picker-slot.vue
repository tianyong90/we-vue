<template>
  <div class="weui-picker__group">
    <div class="weui-picker__mask"></div>
    <div class="weui-picker__indicator"></div>
    <div class="weui-picker__content" :style="pickerContentStyle" ref="listWrap">
      <div class="weui-picker__item">飞机票</div>
      <div class="weui-picker__item">火车票</div>
      <div class="weui-picker__item ">公交票 (disabled)</div>
      <div class="weui-picker__item">其他</div>
    </div>
  </div>
</template>

<script type="text/babel">
import AlloyFinger from 'alloyfinger'

// weui-picker__item_disabled

// 每个选项高度
// const ITEM_HEIGHT = 34

export default {
  name: 'wv-picker-slot',

  props: {
    values: {
      type: Array,
      default () {
        []
      }
    },
    value: {},
    valueKey: String
  },

  data () {
    return {
      visible: true,
      currentValue: this.value,
      af: null
    }
  },

  computed: {
    pickerContentStyle () {
      return { transform: 'translateY(34px)' }
    }
  },

  mounted () {
    let _this = this
    this.af = new AlloyFinger(this.$el, {
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
    onTouchmove (e) {
      // this.$refs.listWrap
    },

    onTouchend (e) {
      console.log(e)
    }
  }
}
</script>
