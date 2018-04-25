Grid
---
九宫格。

## 引入

```js
import { Grid, GridItem } from 'we-vue'

Vue.use(Grid)
Vue.use(GridItem)
```
:::warning
grid 需要与 grid-item 配合使用
:::

## 例子

### 基本示例

```html
<wv-grid>
  <wv-grid-item to="/">
    <img :src="thumbSmall" slot="icon">
    <span slot="label">GridItem</span>
  </wv-grid-item>
  <wv-grid-item url="/">
    <img :src="thumbSmall" slot="icon">
    <span slot="label">GridItem</span>
  </wv-grid-item>
  <wv-grid-item>
    <img :src="thumbSmall" slot="icon">
    <span slot="label">GridItem</span>
  </wv-grid-item>
  <wv-grid-item to="/">
    <span>自定义内容</span>
  </wv-grid-item>
  <wv-grid-item @click="onClick">
      <span>处理点击事件</span>
    </wv-grid-item>
</wv-grid>

<script>
export default {
  methods: {
    onClick () {
      console.log('click')
    }
  } 
}
</script>
```

## API

- grid-item

|     参数     |   类型    |   说明    |         可选值          |   默认值   |
| :--------: | :-----: | :-----: | :------------------: | :-----: |
|    to    | String 或 Object  |   vue-router 跳转目标    |  |  |
|    url    | String  |   url 跳转目标    |  |  |

:::tip
从 v1.6.0 开始，使用 to 定义 vue-router 跳转目标，使用 url 定义普通跳转。
:::

## Slots

|   name   |   描述    |
| :----: | :-----: |
| -  | 默认，当无 icon 和 label 时可在此插入自定义内容  |
| icon  | icon 插座  |
| label  | label 插座  |
