<template>
  <div class="weui-panel weui-panel_access">
    <div class="weui-panel__hd" v-if="title" v-html="title"></div>
    <div class="weui-panel__bd">
      <slot></slot>
    </div>
    <div class="weui-panel__ft">
      <slot name="ft"></slot>
    </div>
</div>
</template>

<script type="text/babel">
export default {
  name: 'wv-panel',

  props: {
    title: String,
    value: String,
    label: String,
    isLink: Boolean,
    to: String
  },

  computed: {
  },

  methods: {
  }
}
</script>
