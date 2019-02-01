<template>
  <div class="weui-footer">
    <p class="weui-footer__links" v-if="links.length > 0">
      <FooterLink
        v-for="item in links"
        :key="item.text"
        :text="item.text"
        :to="item.link"
      />
    </p>
    <p class="weui-footer__text" v-html="text" />
  </div>
</template>

<script>
import footer from './footer.vue.ts'
export default footer
</script>
