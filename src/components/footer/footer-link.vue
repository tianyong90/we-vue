<template>
  <div class="weui-footer__link" @click="onClick">{{ text }}</div>
</template>

<script>
  import RouterLink from '../../mixins/router-link'

  export default {
    name: 'wv-footer-link',

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
  }
</script>
