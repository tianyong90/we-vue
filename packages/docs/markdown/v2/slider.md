---
title: Slider
keywords: 'we-vue, slider'
description: ''
demo_url: //demo.wevue.org/slider
---

Slider

滑块。

## 引入

```js
import { Slider } from 'we-vue'

Vue.use(Slider)
```

## 例子

### 基本示例

```html
<wv-slider v-model="percent" :min="10" :max="80"></wv-slider>
```

### 不显示当前数值

```html
<wv-slider v-model="percent" :show-value="false"></wv-slider>
```

### 禁用

```html
<wv-slider v-model="percent" disabled></wv-slider>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| min  | Number  |  最小值   |      |   0    |
| max  | Number  |  最大值   |      |   100    |
| step  | Number  |  步进值   |      |   1    |
| show-value  | Boolean  |  是否显示右侧当前值文字   |      |   true    |
| enable-click  | Boolean  |  是否启用点击操作   |      |   true    |
| disabled | Boolean | 是否禁用 |      | false |
