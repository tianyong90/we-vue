<template>
  <div class="page">
    <w-footer class="footer-demo" text="Copyright © 2017 wevue.org"/>
    <w-footer class="footer-demo" text="Copyright © 2017 wevue.org" :links="links1"/>
    <w-footer class="footer-demo" text="Copyright © 2017 wevue.org" :links="links2"/>
    <w-footer class="footer-demo" text="Copyright © 2017 wevue.org" :links="links3"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      links1: [
        {
          text: '底部链接1',
          link: '/',
        },
      ],
      links2: [
        {
          text: '底部链接2',
          link: '/footer',
        },
        {
          text: '底部链接3',
          link: '/footer',
        },
      ],
      links3: [
        {
          text: '返回首页',
          link: '/',
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
.page {
  padding: 5em 0;

  .footer-demo {
    margin-bottom: 40px;
  }
}
</style>
