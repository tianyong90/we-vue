<template>
  <div class="weui-footer">
    <p class="weui-footer__links" v-if="links.length > 0">
      <FooterLink
        v-for="item in links"
        :key="item.text"
        :text="item.text"
        :to="item.link"/>
    </p>
    <p class="weui-footer__text" v-html="text"/>
  </div>
</template>

<script>
import FooterLink from './footer-link'
import create from '../utils/create'

export default create({
  name: 'footer',

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
})
</script>
