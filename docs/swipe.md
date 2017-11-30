Swipe
---
滑动轮播。

## 引入

```js
import { Swipe, SwipeItem } from 'we-vue'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
```

## 例子

### 基础示例

```html
<wv-swipe :height="130" :auto="4000">
  <wv-swipe-item style="background-color: #f44336">1</wv-swipe-item>
  <wv-swipe-item style="background-color: #ffc107">2</wv-swipe-item>
  <wv-swipe-item style="background-color: #03a9f4">3</wv-swipe-item>
</wv-swipe>
```

### 不自动播放

```html
<wv-swipe :height="130" :auto="0">
  <wv-swipe-item style="background-color: #f44336">1</wv-swipe-item>
  <wv-swipe-item style="background-color: #ffc107">2</wv-swipe-item>
  <wv-swipe-item style="background-color: #03a9f4">3</wv-swipe-item>
</wv-swipe>
```

### 单张轮播

```html
<wv-swipe :height="130" :show-indicators="false" :auto="5000">
  <wv-swipe-item style="background-color: #f44336">单张轮播</wv-swipe-item>
</wv-swipe>
```

## API

- swipe

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| height  | Number  |  高度（单位为像素）   |      |   180  |
| speed  | Number  |  缓动动画速度（单位为毫秒）   |      | 300  |
| default-index  | Number  |  默认显示的轮播索引   |      | 0  |
| auto  | Number  |  自动播放间隔，单位为毫秒，设置为0时不自动播放   |      | 3000  |
| continuous  | Boolean  |  连续循环播放   |      | true  |
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
