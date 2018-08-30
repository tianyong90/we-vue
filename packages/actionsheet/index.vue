<template>
  <div>
    <transition
      enter-active-class="weui-animate-fade-in"
      leave-active-class="weui-animate-fade-out"
    >
      <div
        class="weui-mask weui-animate-fade-in"
        v-show="currentValue && type === 'ios'"
        @click="currentValue = false"
      />
    </transition>
    <transition
      enter-active-class="weui-animate-slide-up"
      leave-active-class="weui-animate-slide-down"
    >
      <div
        class="weui-actionsheet weui-actionsheet_toggle"
        v-if="type === 'ios'"
        v-show="currentValue"
      >
        <div class="weui-actionsheet__title" v-if="title">
          <p class="weui-actionsheet__title-text" v-html="title"/>
        </div>
        <div class="weui-actionsheet__menu">
          <div
            class="weui-actionsheet__cell"
            v-for="item in actions"
            :key="item.name"
            @click="itemClick(item)"
            v-text="item.name"
          />
        </div>
        <div class="weui-actionsheet__action" v-if="cancelText">
          <div class="weui-actionsheet__cell" @click="currentValue = false" v-html="cancelText"/>
        </div>
      </div>
    </transition>

    <transition
      enter-active-class="weui-animate-fade-in"
      leave-active-class="weui-animate-fade-out"
    >
      <div
        class="weui-skin_android"
        v-if="type === 'android'"
        v-show="currentValue"
      >
        <div class="weui-mask" @click="currentValue = false"/>
        <div class="weui-actionsheet">
          <div class="weui-actionsheet__menu">
            <div
              v-for="item in actions"
              :key="item.name"
              class="weui-actionsheet__cell"
              @click="itemClick(item)"
              v-text="item.name"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { create } from '../utils'

export default create({
  name: 'actionsheet',

  props: {
    type: {
      type: String,
      default: 'ios'
    },
    title: String,
    actions: {
      type: Array,
      default: () => []
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    value: Boolean
  },

  data () {
    return {
      currentValue: this.value
    }
  },

  watch: {
    currentValue (val) {
      this.$emit('input', val)
    },

    value (val) {
      this.currentValue = val
    }
  },

  methods: {
    itemClick (item) {
      if (item.method && typeof item.method === 'function') {
        item.method()
      }
      this.currentValue = false
    }
  }
})
</script>

<style scoped lang="scss">
  .weui-actionsheet {
    position: fixed;
    left: 0;
    bottom: 0;
    -webkit-transform: translate(0, 100%);
    transform: translate(0, 100%);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 5000;
    width: 100%;
    background-color: #EFEFF4;
    -webkit-transition: -webkit-transform 0.3s;
    transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
  }

  .weui-actionsheet__title {
    position: relative;
    height: 65px;
    padding: 0 20px;
    line-height: 1.4;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    text-align: center;
    font-size: 14px;
    color: #888;
    background: #FCFCFD;
  }

  .weui-actionsheet__title:before {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .weui-actionsheet__title .weui-actionsheet__title-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .weui-actionsheet__menu {
    background-color: #FCFCFD;
  }

  .weui-actionsheet__action {
    margin-top: 6px;
    background-color: #FCFCFD;
  }

  .weui-actionsheet__cell {
    position: relative;
    padding: 10px 0;
    text-align: center;
    font-size: 18px;
  }

  .weui-actionsheet__cell:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .weui-actionsheet__cell:active {
    background-color: #ECECEC;
  }

  .weui-actionsheet__cell:first-child:before {
    display: none;
  }

  .weui-skin_android .weui-actionsheet {
    position: fixed;
    left: 50%;
    top: 50%;
    bottom: auto;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 274px;
    box-sizing: border-box;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background: transparent;
    -webkit-transition: -webkit-transform 0.3s;
    transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
  }

  .weui-skin_android .weui-actionsheet__action {
    display: none;
  }

  .weui-skin_android .weui-actionsheet__menu {
    border-radius: 2px;
    box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
  }

  .weui-skin_android .weui-actionsheet__cell {
    padding: 13px 24px;
    font-size: 16px;
    line-height: 1.4;
    text-align: left;
  }

  .weui-skin_android .weui-actionsheet__cell:first-child {
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }

  .weui-skin_android .weui-actionsheet__cell:last-child {
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  .weui-actionsheet_toggle {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
</style>
