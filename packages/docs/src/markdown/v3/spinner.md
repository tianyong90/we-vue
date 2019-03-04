Spinner
---
加载动画。

## 引入

```js
import { Spinner } from 'we-vue'

Vue.use(Spinner)
```

## 例子

### 默认例子

```html
<w-group>
  <w-cell title="default">
    <w-spinner type="default" slot="ft"></w-spinner>
    <w-spinner type="snake" slot="ft"></w-spinner>
  </w-cell>
</w-group>
```

### 指定大小

```html
<w-group>
  <w-cell title="default">
    <w-spinner type="default" :size="25" slot="ft"></w-spinner>
    <w-spinner type="snake" :size="25" slot="ft"></w-spinner>
  </w-cell>
</w-group>
```

### 指定颜色

```html
<w-group>
  <w-cell title="default">
    <w-spinner type="default" color="red" slot="ft"></w-spinner>
    <w-spinner type="snake" color="red" slot="ft"></w-spinner>
  </w-cell>
</w-group>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| type  | String  |  显示类型   | 'default','snake','double-snake','bar-circle','dot-circle'   |   'default'    |
| color  | String  |  颜色   |      |   '#ccc'    |
| size  | Number  |  尺寸，单位为 px   |      |   17    |
