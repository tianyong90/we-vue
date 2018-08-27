<template>
  <div class="page">
    <wv-footer class="footer-demo" text="Copyright © 2017 wevue.org"/>
    <wv-footer class="footer-demo" text="Copyright © 2017 wevue.org" :links="links1"/>
    <wv-footer class="footer-demo" text="Copyright © 2017 wevue.org" :links="links2"/>
    <wv-footer class="footer-demo" text="Copyright © 2017 wevue.org" :links="links3"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      links1: [
        {
          text: '底部链接',
          link: '/'
        }
      ],
      links2: [
        {
          text: '底部链接',
          link: '/footer'
        },
        {
          text: '底部链接',
          link: '/footer'
        }
      ],
      links3: [
        {
          text: '返回首页',
          link: '/'
        }
      ]
    }
  }
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
