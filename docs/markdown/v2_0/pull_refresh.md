Progress
---
进度条。

## 引入

```js
import { PullRefresh } from 'we-vue'

Vue.use(PullRefresh)
```

## 例子

```html
<template>
  <wv-pull-refresh @refresh="refresh">
    <div class="content">
      <p class="text">基础用法</p>
      刷新次数：{{ num }}
    </div>
  </wv-pull-refresh>
</template>

<script>
export default {
  data () {
    return {
      num: 0
    }
  },
  methods: {
    refresh (done) {
      setTimeout(() => {
        this.num++
        done()
      }, 500)
    }
  }
}
</script>

<style scoped lang="scss">
.content{
  padding:0 15px;
  .text{
    font-size: 14px;
    color: rgba(69,90,100,.6);
  }
}
</style>
```
## Events

|   事件名   |   说明    |   参数   |
| :----: | :-----: | :----: |
| refresh  | 下拉刷新时触发  |  结束加载动画   |
