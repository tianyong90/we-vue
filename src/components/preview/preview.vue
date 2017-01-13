<template>
  <div class="weui-form-preview">
    <div class="weui-form-preview__hd">
      <label class="weui-form-preview__label" v-html="title"></label>
      <em class="weui-form-preview__value" v-html="value"></em>
    </div>
    <div class="weui-form-preview__bd">
      <div class="weui-form-preview__item" v-for="item in dataItems">
          <label class="weui-form-preview__label">{{ item.label }}</label>
          <span class="weui-form-preview__value">{{ item.value }}</span>
      </div>
    </div>
    <div class="weui-form-preview__ft">
      <a class="weui-form-preview__btn" :class="item.type === 'primary' ? 'weui-form-preview__btn_primary' : 'weui-form-preview__btn_default'" href="javascript:" v-text="item.text" @click="item.action" v-for="item in buttons"></a>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'wv-preview',

  props: {
    title: String,
    value: String,
    dataItems: {
      type: Array,
      default: () => []
    },
    buttons: {
      type: Array,
      default: () => []
    }
  }
}
</script>
