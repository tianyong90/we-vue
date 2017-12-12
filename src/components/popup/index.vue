<template>
  <transition :name="currentTransition">
    <div class="wv-popup" v-show="value">
      <div class="weui-mask weui-animate-fade-in" :style="{ backgroundColor: maskBackgroundColor }"
           @click="maskClick"></div>
      <div class="wv-popup-body weui-animate-slide-up" :style="style">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  import PopupMixin from '../../mixins/popup'

  import { create } from '../../utils'

  export default create({
    name: 'wv-popup',

    mixins: [PopupMixin],

    props: {
      height: {
        type: [String, Number],
        default: 'auto',
        validator: function (val) {
          return /^(auto)|(\d+(px|vh|%)?)$/.test(val)
        }
      },
      maskBackgroundColor: {
        type: String,
        default: ''
      },
      backgroundColor: {
        type: String,
        default: '#fff'
      },
      lockOnScroll: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        currentValue: false,
        currentTransition: 'fade'
      }
    },

    computed: {
      style () {
        let ret = {backgroundColor: this.backgroundColor}

        if (/^\d+$/.test(this.height)) {
          ret.height = parseInt(this.height) + 'px'
        } else {
          ret.height = this.height
        }

        return ret
      }
    },

    mounted () {
      if (this.value) {
        this.open()
      }
    },

    methods: {
      maskClick (e) {
        if (!this.hideOnMask) return
        this.currentValue = false
      }
    }
  })
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
