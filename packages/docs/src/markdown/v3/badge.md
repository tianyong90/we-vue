Badge
---
小徽章。

## 引入

```js
import { Badge } from 'we-vue'

Vue.use(Badge)
```

## 例子

### 基本使用

```html
<w-badge>20</w-badge>
```

### 指定背景色

```html
<w-badge color="red">20</w-badge>
```

### 指定为小红点样式

```html
<w-badge is-dot></w-badge>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| color  | String  |  背景色   |      |       |
| is-dot | Boolean | 是否是为红点 |      | false |
