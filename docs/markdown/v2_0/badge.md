Badge
---
小徽章，支持不同颜色，包含小红点状态。

## 引入

```js
import { Badge } from 'we-vue'
Vue.component(Badge.name, Badge)
```

## 例子

### 基本使用

```html
<wv-badge>20</wv-badge>
```

### 指定背景色

```html
<wv-badge color="red">20</wv-badge>
```

### 指定为小红点状态

```html
<wv-badge :is-dot="true"></wv-badge>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| color  | String  |  背景色   |      |       |
| is-dot | Boolean | 是否是为红点 |      | false |
