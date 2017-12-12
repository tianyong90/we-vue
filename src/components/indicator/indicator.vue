<template>
  <div class="weui-toast" v-show="visible">
    <wv-spinner class="weui-icon_toast" v-if="spinnerType !=='none'" :type="spinnerType" :size="25"></wv-spinner>
    <p class="weui-toast__content" v-text="text"></p>
  </div>
</template>

<script>
  import WvSpinner from '../spinner/index'

  import { create } from '../../utils'

  export default create({
    name: 'wv-indicator',

    components: {
      WvSpinner
    },

    props: {
      text: String,
      spinnerType: {
        type: String
      }
    },

    data () {
      return {
        visible: false
      }
    }
  })
</script>

<style scoped lang="scss">
</style>
