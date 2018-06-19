Flex
---
flex 布局。

## 引入

```js
import { Flex, FlexItem } from 'we-vue'

Vue.use(Flex)
Vue.use(FlexItem)
```
:::warning
flex 需要与 flex-item 配合使用
:::

## 例子

### 基本示例

```html
<wv-flex>
  <wv-flex-item>
    <div class="placeholder"></div>
  </wv-flex-item>
</wv-flex>
```

### 指定间距，两列等宽

```html
<wv-flex :gutter="10">
  <wv-flex-item>
    <div class="placeholder">1/2</div>
  </wv-flex-item>
  <wv-flex-item>
    <div class="placeholder">1/2</div>
  </wv-flex-item>
</wv-flex>
```

### 三列等宽

```html
<wv-flex :gutter="10">
  <wv-flex-item>
    <div class="placeholder">1/3</div>
  </wv-flex-item>
  <wv-flex-item>
    <div class="placeholder">1/3</div>
  </wv-flex-item>
  <wv-flex-item>
    <div class="placeholder">1/3</div>
  </wv-flex-item>
</wv-flex>
```

### 三列不等宽

```html
<wv-flex :gutter="10">
  <wv-flex-item>
    <div class="placeholder">1/4</div>
  </wv-flex-item>
  <wv-flex-item flex="2">
    <div class="placeholder">1/2</div>
  </wv-flex-item>
  <wv-flex-item>
    <div class="placeholder">1/4</div>
  </wv-flex-item>
</wv-flex>
```

### offset

flex-item offset 属性接受一个 String 类型的值，表示对应 fle-item 的 margin-left

```html
<wv-flex :gutter="10">
  <wv-flex-item>
    <div class="placeholder">1/4</div>
  </wv-flex-item>
  <wv-flex-item flex="2">
    <div class="placeholder">1/2</div>
  </wv-flex-item>
  <wv-flex-item>
    <div class="placeholder">1/4</div>
  </wv-flex-item>
</wv-flex>
```

## API

- flex

|     参数     |   类型    |   说明    |         可选值          |   默认值   |
| :--------: | :-----: | :-----: | :------------------: | :-----: |
|    gutter    | Number  |   列间距    |  | 0 |

- flex-item

|     参数     |   类型    |   说明    |         可选值          |   默认值   |
| :--------: | :-----: | :-----: | :------------------: | :-----: |
|    flex    | Number/String  |   相当于 CSS3 中 flex 属性    |  | 1 |
|    offset    | String  |   指定 flex-item margin-left    |  |  |
