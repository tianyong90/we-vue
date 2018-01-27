Footer
---
页脚。

## 引入

```js
import { Footer } from 'we-vue'

Vue.use(Footer)
```

## 例子

```html
<template>
  <div class="page">
    <wv-footer class="footer-demo" text="Copyright © 2017 wevue.org"></wv-footer>
    <wv-footer class="footer-demo" text="Copyright © 2017 wevue.org" :links="links1"></wv-footer>
    <wv-footer class="footer-demo" text="Copyright © 2017 wevue.org" :links="links2"></wv-footer>
    <wv-footer class="footer-demo" text="Copyright © 2017 wevue.org" :links="links3"></wv-footer>
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
```

## API

|     参数     |   类型    |   说明    |         可选值          |   默认值   |
| :--------: | :-----: | :-----: | :------------------: | :-----: |
|    text    | String  |   页脚文字    |                      |  |
|    links   | Array | 页脚链接 |                    |    |
