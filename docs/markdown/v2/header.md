Header
---
页头。

## 引入

```js
import { Header } from 'we-vue'
Vue.component(Header.name, Header)
```

## 例子

### 默认

```html
<wv-header title="wevue" @headerClick="onHeaderClick">
</wv-header>
```

### 不固定并指定背景色
```html
<wv-header title="wevue" @headerClick="onHeaderClick" :fixed="false" background-color="#2196f3">
  <div class="btn-back" slot="left">
    <i class="iconfont icon-back" @click="$router.push('/')"></i>
  </div>
  <div class="btn-menu" slot="right">
    <i class="iconfont icon-menu" @click="$router.push('/')"></i>
  </div>
</wv-header>
```

## API

|     参数     |   类型    |   说明    |         可选值          |   默认值   |
| :--------: | :-----: | :-----: | :------------------: | :-----: |
|    title    | String  |   标题    |                      |  |
|    fixed   | Boolean | 是否固定 |                    |  true  |
|  background-color  | String |  背景色   |                      |  '#21292c'  |

## Slots

|   name   |   描述    |
| :----: | :-----: |
| left  | 左侧按钮位  |
| right  | 右侧按钮位  |
