<template>
  <div v-if="visible">
    <div class="weui-toast" :class="{ 'weui-toast_text': type === 'text' }" :style="style" ref="toast">
      <wv-icon :type="icon" class="weui-icon_toast" v-if="type !== 'text'"></wv-icon>
      <p class="weui-toast__content" v-text="message"></p>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    props: {
      visible: {
        default: true
      },
      icon: {
        type: String,
        default: 'success-no-circle'
      },
      type: {
        type: String,
        default: 'success'
      },
      message: {
        type: String,
        default: ''
      }
    },

    computed: {
      style () {
        if (this.type === 'text') {
          const messageLength = this.message.length + 2

          return {
            width: messageLength + 'em',
            marginLeft: '-' + (messageLength / 2) + 'em'
          }
        }

        return {}
      }
    }
  }
</script>

<style scoped lang="scss">
  .weui-icon_toast {
    font-size: 40px;
  }

  .weui-toast_text {
    width: auto;
    min-width: 0;
    min-height: 0;
    padding: .5em 0;

    .weui-toast__content {
      margin: 0;
    }
  }
</style>
