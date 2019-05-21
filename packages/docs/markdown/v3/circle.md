---
title: Circle
keywords: 'we-vue, circle'
description: ''
demo_url: //demo.wevue.org/circle
---

Circle

环形进度指示。

## 引入

```js
import { Circle } from 'we-vue'

Vue.use(Circle)
```

## 例子

### 指定线宽

```html
<w-circle :line-width="3" value="12">12 %</w-circle>
```

### 指定填充色

```html
<w-circle :line-width="5" fill-color="yellow" value="12">12 %</w-circle>
```

### 指定直径

```html
<w-circle :line-width="10" stroke-color="red" v-model="sliderValue" :diameter="200">{{ sliderValue }}%</w-circle>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| diameter  | Number  |  圆环直径   |      | 100  |
| line-width  | Number  |  线宽   |      | 4  |
| stroke-color  | String  |  主色   |      | '#3FC7FA'  |
| trail-color  | String  |  轨道色   |      | '#D9D9D9'  |
| fill-color  | String  |  圆环内部填充色   |      | 'none'  |
| speed  | Number  |  缓动速度（单位 ms）   |      | 500  |
| value  | Number  |  当前百分比   |      | 0  |

## Slots

|   name   |   描述    |
| :----: | :-----: |
| -  | 圆环中部内容  |
