<template>
  <div class="wv-popup-conatiner" ref="container">
    
  </div>
</template>

<script>
  export default {
    name: 'wv-popup-conatiner',

    methods: {
      addPopUp ($dom) {
        this.$refs.container.appendChild($dom)
      },

      removePopUp ($dom) {
        this.$refs.container.removeChild($dom)
      },

      turnOn () {
        this.$el.classList.add('on');
      },

      turnOff () {
        this.$el.classList.remove('on');
      }
    }
  }
</script>

<style scoped lang="scss">
  .wv-popup-conatiner {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;

    &.on{
      z-index: 0;
    }
  }
</style>
