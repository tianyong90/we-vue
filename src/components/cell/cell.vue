<template>
  <a class="weui-cell" :class="{'weui-cell_access': isLink}" :href="href" v-if="to" @touchend="touchEnd">
    <div class="weui-cell_hd">
      <slot name="icon"></slot>
    </div>
    <div class="weui-cell__bd">
      <slot name="bd"><p v-html="title"></p></slot>
    </div>
    <div class="weui-cell__ft">
      <slot name="ft">{{ value }}</slot>
    </div>
  </a>
  <div class="weui-cell" :class="{'weui-cell_access': isLink}" @touchend="touchEnd" v-else>
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
  export default {
    name: 'wv-cell',

    props: {
      title: {
        type: [String, Number]
      },
      value: {
        type: [String, Number]
      },
      isLink: Boolean,
      to: String
    },

    computed: {
      href () {
        if (this.to && !this.added && this.$router) {
          const resolved = this.$router.match(this.to)
          if (!resolved.matched.length) return this.to

          this.$nextTick(() => {
            this.added = true
            this.$el.addEventListener('click', this.handleClick)
          })
          return resolved.path
        }
        return this.to
      }
    },

    mounted () {
      // 处理在 cell-swipe 中的点击事件
      this.$on('CLICK_IN_CELLSWIPE', this.handleClick)
    },

    methods: {
      touchEnd (e){
        this.$emit('touchend', e);
      },

      handleClick (event) {
        event.preventDefault()
        if (typeof this.href !== 'undefined') {
          this.$router.push(this.href)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .weui-cell{
    z-index: 0;
  }
</style>
