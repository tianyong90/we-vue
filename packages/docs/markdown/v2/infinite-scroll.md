---
title: InfiniteScroll
keywords: 'we-vue, infinite-scroll'
description: ''
demo_url: //demo.wevue.org/infinite-scroll
---

InfiniteScroll

无限滚动加载指令。

## 引入

```js
import { InfiniteScroll } from 'we-vue'

Vue.use(InfiniteScroll)
```

## 例子

为 HTML 元素添加 v-infinite-scroll 指令即可使用无限滚动。滚动该元素，当其底部与被滚动元素底部的距离小于给定的阈值（通过 infinite-scroll-distance 设置）时，绑定到 v-infinite-scroll 指令的方法就会被触发。

```html
<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
  <wv-group
    title="无限滚动加载"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="50"
  >
    <wv-cell title="条目" v-for="item in list" :key="item" :value="item"/>
  </wv-group>
  <p v-show="loading" class="loading-tips">
    <wv-spinner type="snake" color="#444" :size="24"/>
  </p>
</div>
```

```js
export default {
  data () {
    return {
      list: [],
      loading: false,
      allLoaded: false,
      wrapperHeight: 0
    }
  },

  methods: {
    loadMore () {
      console.log('loading more')
      this.loading = true
      setTimeout(() => {
        let last = this.list[this.list.length - 1]
        for (let i = 1; i <= 5; i++) {
          this.list.push(last + i)
        }
        this.$nextTick(() => {
          this.loading = false
        })
      }, 2000)
    }
  },

  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    for (let i = 1; i <= 15; i++) {
      this.list.push(i)
    }
  }
}
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| infinite-scroll-disabled  | Boolean  |  是否禁用   |      |   false   |
| infinite-scroll-distance  | Number  |  触发加载方法的滚动距离阈值（像素）   |      |   0   |
