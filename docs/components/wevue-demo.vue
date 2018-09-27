<template>
  <div
    class="demo-wrap"
    :style="{ top: positionTop + 'px' }"
  >
    <div class="mobile-top"/>
    <iframe id="iframe-demo" :src="url" frameborder="0"/>
  </div>
</template>

<script>
export default {
  name: 'wevue-demo',

  props: {
    url: {
      type: String,
      default: '//demo.wevue.org'
    },
    stickyTop: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      positionTop: this.stickyTop
    }
  },

  mounted () {
    // 右侧 DEMO 区实在 sticky 效果
    document.addEventListener('scroll', () => {
      const scrollDistance = Math.abs(document.body.getBoundingClientRect().top)
      if (scrollDistance >= this.stickyTop - 20) {
        this.positionTop = scrollDistance + 20
      } else {
        this.positionTop = this.stickyTop
      }
    })
  }
}
</script>

<style scoped lang="scss">
  .demo-wrap {
    display: block;
    overflow: hidden;
    width: 375px;
    min-width: 375px;
    z-index: 50;
    border-radius: 6px;
    box-sizing: border-box;
    right: 20px;
    position: absolute;
    box-shadow: #999 -3px 3px 20px;

    .mobile-top {
      display: block;
      overflow: hidden;
      width: 100%;
      height: 42px;
      background: url(../assets/mobile_top.jpg) left top no-repeat;
      background-size: contain;
    }

    iframe {
      width: 100%;
      height: 555px;
    }
  }
</style>
