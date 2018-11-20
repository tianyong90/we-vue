<template>
  <div class="wv-swipe-item" :style="style">
    <slot />
  </div>
</template>

<script lang="ts">
// TODO
// import '../../scss/swipe.scss'

import Vue from 'vue'

// parent swipe
interface Swipe extends Vue {
  width: number,
  swipes: Array<any>
}

export default Vue.extend({
  name: 'wv-swipe-item',

  data () {
    return {
      offset: 0
    }
  },

  computed: {
    style (): object {
      return {
        width: (this.$parent as Swipe).width + 'px',
        transform: `translate3d(${this.offset}px, 0, 0)`
      }
    }
  },

  beforeCreate (): void {
    this.$parent && (this.$parent as Swipe).swipes.push(this)
  },

  destroyed (): void {
    this.$parent &&
      (this.$parent as Swipe).swipes.splice((this.$parent as Swipe).swipes.indexOf(this), 1)
  }
})
</script>
