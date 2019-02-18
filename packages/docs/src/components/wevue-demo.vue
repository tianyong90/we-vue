<template>
  <div
    class="demo-wrap"
  >
    <div class="mobile-statusbar">
      <div>
        <span class="iconfont icon-signal"></span>
        <span class="isp-name">中国联通</span>
        <span class="iconfont icon-ios-wifi"></span>
      </div>
      <span class="time">20.45</span>
      <span class="iconfont icon-ios-battery-full"></span>

    </div>
    <div class="iframe-wrapper">
      <iframe
        :src="url"
        frameborder="0"
      />
    </div>
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
@import url("//at.alicdn.com/t/font_223763_hzc932fe6po.css");

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

  .mobile-statusbar {
    display: flex;
    overflow: hidden;
    width: 100%;
    background-color: #f8f8f8;
    justify-content: space-between;
    padding: 3px 5px;
    position: relative;

    .iconfont {
      color: #333333;
      font-size: 16px;
    }

    .isp-name {
      font-size: 14px;
      margin: 0 5px;
    }

    .time {
      font-size: 14px;
      width: 50px;
      text-align: center;
      position: absolute;
      left: calc(50% - 25px);
    }

    .singal {
      background-color: #f00;
    }
  }

  .iframe-wrapper {
    display: block;
    position: relative;
    overflow: hidden;
    background: #f00;
  }

  iframe {
    display: block;
    overflow: hidden;
    width: 100%;
    height: 500px;
  }
}
</style>
