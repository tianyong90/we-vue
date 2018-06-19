<template>
  <div v-show="visible"/>
</template>

<script>
import PopupMixin from '@/mixins/popup'

export default {
  name: 'emitter-mixin-component',

  mixins: [PopupMixin]
}
</script>
