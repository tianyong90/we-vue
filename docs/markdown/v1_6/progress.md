Progress
---
进度条。

## 引入

```js
import { Progress } from 'we-vue'
Vue.component(Progress.name, Progress)
```

## 例子

### 默认

```html
<wv-progress :percent="percent2"/>
```

### 隐藏取消按钮

```html
<wv-progress :percent="percent1" :show-clear="false" @cancel="onCancel"/>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| percent  | Number/String  |  百分比值   |      |   |
| show-clear  | Boolean  |  显示清除按钮   |      | true  |


## Events

|   事件名   |   说明    |   参数   |
| :----: | :-----: | :----: |
| cancel  | cancel 按钮点击事件  |  当前组件   |
