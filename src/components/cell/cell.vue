<template>
  <div class="weui-cell" :class="{'weui-cell_access': isLink}" @click="onClick">
    <div class="weui-cell_hd">
      <slot name="icon"></slot>
    </div>
    <div class="weui-cell__bd">
      <slot name="bd"><p v-html="title"></p></slot>
    </div>
    <div class="weui-cell__ft">
      <slot name="ft">{{ value }}</slot>
    </div>
  </div>
</template>

<script>
  import RouterLink from '../../mixins/router-link'

  export default {
    name: 'wv-cell',

    mixins: [RouterLink],

    props: {
      title: {
        type: [String, Number]
      },
      value: {
        type: [String, Number]
      },
      isLink: Boolean
    },

    mounted () {
      // 处理在 cell-swipe 中的点击事件
      this.$on('CLICK_IN_CELLSWIPE', this.onClick)
    },

    methods: {
      onClick () {
        this.$emit('click')
        this.routerLink()
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
