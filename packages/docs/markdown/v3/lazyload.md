---
title: Lazyload
keywords: 'we-vue, lazyload'
description: ''
demo_url: //demo.wevue.org/lazyload
---

Lazyload

图片懒加载。

## 引入

```js
import { Lazyload } from 'we-vue'

Vue.use(Lazyload)
```

## 例子

### 基本示例

```html
<template>
  <div class="page">
    <ul class="lazyload-list">
      <li class="lazyload-list-item" v-for="item in list">
        <img v-lazy="item" class="lazyload-image">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'https://cdn.pixabay.com/photo/2015/03/18/09/31/prairie-679014__340.jpg',
        'https://cdn.pixabay.com/photo/2015/03/18/09/29/the-scenery-679011__340.jpg',
        'https://cdn.pixabay.com/photo/2015/03/28/16/40/lake-696098__340.jpg',
        'https://cdn.pixabay.com/photo/2013/07/01/17/36/sunset-142698__340.jpg',
        'https://cdn.pixabay.com/photo/2013/11/10/20/53/forest-208517__340.jpg',
        'https://cdn.pixabay.com/photo/2015/01/08/15/48/creek-593146__340.jpg'
      ]
    }
  }
}
</script>
```
