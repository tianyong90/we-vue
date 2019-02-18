<template>
  <div
    class="demo-wrap"
  >
    <div class="mobile-top"/>
    <iframe
      id="iframe-demo"
      :src="url"
      frameborder="0"
    />
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
  }
}
</script>

<style scoped lang="scss">
.demo-wrap {
  display: block;
  overflow: hidden;
  position: fixed;
  top: 100px;
  right: 20px;
  width: 375px;
  min-width: 375px;
  z-index: 50;
  border-radius: 6px;
  box-sizing: border-box;
  box-shadow: #999 -3px 3px 20px;

  .mobile-top {
    display: block;
    overflow: hidden;
    width: 100%;
    height: 42px;
    background: url(../assets/image/mobile_top.jpg) left top no-repeat;
    background-size: contain;
  }

  iframe {
    width: 100%;
    height: 555px;
  }
}
</style>
