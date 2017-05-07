<template>
  <div class="weui-footer">
    <p class="weui-footer__links" v-if="links.length > 0">
      <FooterLink v-for="item in links" :text="item.text" :to="item.link"></FooterLink>
    </p>
    <p class="weui-footer__text" v-html="text"></p>
  </div>
</template>

<script>
  import FooterLink from './footer-link.vue'

  export default {
    name: 'wv-footer',

    components: {
      FooterLink
    },

    props: {
      text: String,
      links: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
