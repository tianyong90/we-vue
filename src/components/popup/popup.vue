<template>
  <div class="wv-popup" v-if="currentValue">
    <div class="weui-mask weui-animate-fade-in" :style="{ backgroundColor: maskBackgroundColor }"
         @click="maskClick"></div>
    <div class="wv-popup-body weui-animate-slide-up" :style="style">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wv-popup',

    props: {
      value: Boolean,
      height: {
        type: String | Number,
        default: 'auto'
      },
      hideOnMask: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: ''
      },
      backgroundColor: {
        type: String,
        default: '#fff'
      }
    },

    data () {
      return {
        currentValue: this.value
      }
    },

    computed: {
      style () {
        let ret = { backgroundColor: this.backgroundColor }

        if (this.height === 'auto') {
          ret.height = 'auto'
        } else {
          ret.height = parseInt(this.height) + 'px'
        }

        return ret
      }
    },

    methods: {
      maskClick (e) {
        if (!this.hideOnMask) return
        this.currentValue = false
      }
    },

    watch: {
      value (val) {
        this.currentValue = val
      },

      currentValue (val) {
        this.$emit('input', val)

        if (val) {
          this.$emit('show')
        } else {
          this.$emit('hide')
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .wv-popup-body {
    display: block;
    background-color: #fff;
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 5000;
    transform: translateY(100%);
    transition: transform .3s;
  }
</style>
