<template>
  
</template>

<script>
  export default {
    name: 'wv-android-list',

    props: {
      
    },

    data () {
      return {
        currentValue: this.value
      }
    },

    mounted () {
      if (this.value) {
        this.currentValue = true
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
  }
</script>

<style scoped lang="scss">
  .actionsheet__mask_show {
    display: block;
    transform-origin: 0px 0px 0px;
    opacity: 1;
    transform: scale(1, 1);
    background-color: rgba(0, 0, 0, 0.6);
  }

  .weui-skin_android {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    & .weui-actionsheet {
      display: inline-block;
      flex: 0 0 auto;
      top:unset;
      left: unset;
      transform: unset;
    }
  }

</style>
