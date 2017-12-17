<template>
  <div v-show="visible"></div>
</template>

<script>
  import PopupMixin from '@/mixins/popup'

  export default {
    name: 'emitter-mixin-component',

    mixins: [PopupMixin]
  }
</script>
