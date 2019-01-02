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
  <wv-pull-refresh v-model="isLoading" @refresh="refresh">
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
      isLoading: false,
      num: 0
    }
  },
  methods: {
    refresh () {
      setTimeout(() => {
        this.isLoading = false
        this.num++
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

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| v-model  | Boolean |  数据加载完毕后关闭加载动画   |      | false  |


## Events

|   事件名   |   说明    |   参数   |
| :----: | :-----: | :----: |
| refresh  | 下拉成功后的回调函数  |     |
