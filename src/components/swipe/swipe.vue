<template>
  <div class="wv-swipe" :style="{ height: height + 'px' }">
    <slot></slot>
  </div>
</template>

<script type="text/babel">
import Vue from 'vue'
import VueFinger from 'vue-finger'

Vue.use(VueFinger)
export default {
  name: 'wv-swipe',

  data () {
    return {
      ready: false,
      dragging: false,
      userScrolling: false,
      animating: false,
      index: 0,
      pages: [],
      timer: null,
      reInitTimer: null,
      noDrag: false
    }
  },

  props: {
    height: {
      type: Number,
      default: 180
    },
    speed: {
      type: Number,
      default: 300
    },

    defaultIndex: {
      type: Number,
      default: 0
    },

    auto: {
      type: Number,
      default: 3000
    },

    continuous: {
      type: Boolean,
      default: true
    },

    showIndicators: {
      type: Boolean,
      default: true
    },

    noDragWhenSingle: {
      type: Boolean,
      default: true
    },

    prevent: {
      type: Boolean,
      default: false
    }
  },

  computed: {
  },

  methods: {
    swipeItemCreated () {
      if (!this.ready) return

      // clearTimeout(this.reInitTimer);
      // this.reInitTimer = setTimeout(() => {
      //   this.reInitPages();
      // }, 100);
    },

    swipeItemDestroyed () {
      if (!this.ready) return

      // clearTimeout(this.reInitTimer);
      // this.reInitTimer = setTimeout(() => {
      //   this.reInitPages();
      // }, 100);
    }
  },

  destroyed () {
    console.log('destroyed')
  }
}
</script>

<style scoped lang="scss">
  .wv-swipe {
    display: block;
    overflow: hidden;
    position: relative;
    width: 100%;
    background: red;
  }
</style>
