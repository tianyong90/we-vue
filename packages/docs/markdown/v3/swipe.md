---
title: Swipe
keywords: 'we-vue, swipe'
description: ''
demo_url: //demo.wevue.org/swipe
---

Swipe

轮播。

## 引入

```js
import { Swipe, SwipeItem } from 'we-vue'

Vue.use(Swipe).use(SwipeItem)
```

## 例子

### 基础示例

```html
<w-swipe :height="130" :autoplay="4000">
  <w-swipe-item style="background-color: #f44336">1</w-swipe-item>
  <w-swipe-item style="background-color: #ffc107">2</w-swipe-item>
  <w-swipe-item style="background-color: #03a9f4">3</w-swipe-item>
</w-swipe>
```

### 不自动播放

```html
<w-swipe :height="130" :autoplay="0">
  <w-swipe-item style="background-color: #f44336">1</w-swipe-item>
  <w-swipe-item style="background-color: #ffc107">2</w-swipe-item>
  <w-swipe-item style="background-color: #03a9f4">3</w-swipe-item>
</w-swipe>
```

### 单张轮播

```html
<w-swipe :height="130" :show-indicators="false" :autoplay="5000">
  <w-swipe-item style="background-color: #f44336">单张轮播</w-swipe-item>
</w-swipe>
```

## API

- swipe

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| height  | Number  |  高度（单位为像素）   |      |   180  |
| duration  | Number  |  轮播动作时间（单位为毫秒）   |      | 500  |
| default-index  | Number  |  默认显示的轮播索引   |      | 0  |
| autoplay  | Number  |  自动播放间隔，单位为毫秒，设置为0时不自动播放   |      |   |
| show-indicators  | Boolean  |  显示轮播指示   |      | true  |
| no-drag-when-single  | Boolean  |  只有一张时不允许拉动   |      | true  |
| prevent  | Boolean  |  是否在 touchstart 事件触发时阻止事件的默认行为。设为 true 可提高运行在低版本安卓浏览器时的性能   |      | false  |

## Slots

- swipe

|   name   |   描述    |
| :----: | :-----: |
| -  | 一个或多个 swipe-item 组件  |

- swipe-item

|   name   |   描述    |
| :----: | :-----: |
| -  | 单个轮播的内容  |
