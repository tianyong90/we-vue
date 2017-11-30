Grid
---
九宫格。

## 引入

```js
import { Grid, GridItem } from 'we-vue'
Vue.component(Grid.name, Grid)
Vue.component(GridItem.name, GridItem)
```
> **grid 需要与 grid-item 配合使用**

## 例子

### 基本示例

```html
<wv-grid>
  <wv-grid-item to="/">
    <img :src="thumbSmall" slot="icon">
    <span slot="label">GridItem</span>
  </wv-grid-item>
  <wv-grid-item to="/">
    <img :src="thumbSmall" slot="icon">
    <span slot="label">GridItem</span>
  </wv-grid-item>
  <wv-grid-item to="/">
    <img :src="thumbSmall" slot="icon">
    <span slot="label">GridItem</span>
  </wv-grid-item>
  <wv-grid-item to="/">
    <span>自定义内容</span>
  </wv-grid-item>
  <wv-grid-item to="/">
    <span>自定义内容</span>
  </wv-grid-item>
</wv-grid>
```

## API

- grid-item

|     参数     |   类型    |   说明    |         可选值          |   默认值   |
| :--------: | :-----: | :-----: | :------------------: | :-----: |
|    to    | String  |   点击后跳转目标地址    |  |  |

## Slots

|   name   |   描述    |
| :----: | :-----: |
| -  | 默认，当无 icon 和 label 时可在此插入自定义内容  |
| icon  | icon 插座  |
| label  | label 插座  |
