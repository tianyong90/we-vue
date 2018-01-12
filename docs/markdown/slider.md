Slider
---
滑块。

## 引入

```js
import { Slider } from 'we-vue'
Vue.component(Slider.name, Slider)
```

## 例子

### 基本示例

```html
<wv-slider v-model="percent" :min="10" :max="80"></wv-slider>
```

### 禁用状态

```html
<wv-slider :value="50" :min="10" :max="100" disabled :show-value-box="false"></wv-slider>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| min  | Number  |  最小值   |      |   0    |
| max  | Number  |  最大值   |      |   100    |
| step  | Number  |  步进值   |      |   1    |
| show-value-box  | Boolean  |  是否显示右侧当前值文字   |      |   true    |
| disabled | Boolean | 是否禁用 |      | false |
