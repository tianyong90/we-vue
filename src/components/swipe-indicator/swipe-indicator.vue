<template>
  <div class="wv-swipe-indicator" @click="switchTo">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'wv-swipe-indicator',

    created (){
      this.key = null;
    },

    mounted () {
      this.key = Array.prototype.indexOf.call(this.$el.parentElement.children,this.$el);
    },

    methods: {
      switchTo (){
        this.$parent.goTo(this.key);
      }
    },
  }
</script>

<style scoped lang="scss">
</style>
