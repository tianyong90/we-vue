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
</style>
