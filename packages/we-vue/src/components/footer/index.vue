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

<script lang="ts">
import '../../scss/footer.scss'

import FooterLink from './footer-link.vue'
import Themeable from '../../mixins/themeable'

import mixins from '../../utils/mixins'

export default mixins(
  Themeable
  /* @vue/component */
).extend({
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
})
</script>
