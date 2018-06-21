Icon
---
图标。

## 引入

```js
import { Icon } from 'we-vue'

Vue.use(Icon)

// 或
Vue.use(Icon)
```

## 例子

### 大图标

```html
<wv-icon type="success" :large="true"></wv-icon>
```

### 小图标

```html
<wv-icon type="success"></wv-icon>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| type `(required)`  | String  |  图标类型   | 'success', 'info', 'warn', 'waiting', 'success-no-circle', 'circle', 'info-circle', 'download', 'cancel', 'search'   |      |
| large | Boolean | 是否为大图标 |      | false |

