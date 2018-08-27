<template>
  <div class="weui-footer__link" @click="onClick" v-text="text" />
</template>

<script>
import RouterLink from '../mixins/router-link'
import { create } from '../utils'

export default create({
  name: 'footer-link',

  mixins: [RouterLink],

  props: {
    text: String
  },

  methods: {
    onClick () {
      this.$emit('click')
      this.routerLink()
    }
  }
})
</script>
