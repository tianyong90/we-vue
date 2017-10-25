<template>
  <div :ref="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'gesture-inview',

  data() {
    return {
      inView: false
    }
  },

  props: {
    // 设置相对于viewpoint的中心放大的倍数
    scale: {
      type: Number,
      default: 1
    }
  },

  /** Event list:
   * inView
   * outView
   */

  /** Notice
   * 不能工作原因, 在子元素使用了e.stopPropagation()
   */

  mounted() {
    window.addEventListener('touchmove', this._throttle(80, this._touchMove));
  },

  methods: {
    init() {
      this._touchMove();
    },

    _touchMove(e) {
      if (this._checkInView($this.$refs.container)) {
        if (!this.inView) {
          this.inView = true;
          this.$emit('inView');
        }
      } else {
        if (this.inView) {
          this.inView = false;
          this.$emit('outView');
        }
      }
    },

    _checkInView($elem) {
      var rect = $elem.getBoundingClientRect();
      var offset = (1 - this.scale) / 2;
      var boundingLeft = this.window.innerWidth * offset;
      var boundingRight = this.window.innerWidth * (1 - offset);
      var boundingTop = this.window.innerHeight * offset;
      var boudningBottom = this.window.innerHeight * (1 - offset);

      return (rect.top < boudningBottom && rect.bottom > boundingTop) && //上下
        (rect.left < boudningRight && rect.right > boundingLeft)    //左右
    },

    _throttle(delay, callback, tail) {
      var timer = null, context;
      tail = tail === undefined ? true : tail;

      return function() {
        if (timer) return

        let args = arguments;
        context = this;

        if (!tail) callback.apply(context, args);
        timer = setTimeout(function() {
          timer = null;
          if (tail) callback.apply(context, args);
        }, delay);
      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
