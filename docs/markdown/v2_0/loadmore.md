Loadmore
---
加载更多。

## 引入

```js
import { Loadmore } from 'we-vue'

Vue.use(Loadmore)
```

## 例子

### 基本示例

```html
<wv-loadmore></wv-loadmore>
```

### 指定文字

```html
<wv-loadmore type="line" text="loading"></wv-loadmore>
```

### 点划线

```html
<wv-loadmore type="lineDot" text="loading"></wv-loadmore>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| type  | String  |  类型   |  'default', 'lineDot'    |   'default'    |
| text  | String  |  文字   |      |       |
