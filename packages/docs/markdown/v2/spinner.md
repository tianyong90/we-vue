---
title: Spinner
keywords: 'we-vue, spinner'
description: ''
demo_url: //demo.wevue.org/spinner
---

Spinner

加载动画。

## 引入

```js
import { Spinner } from 'we-vue'

Vue.use(Spinner)
```

## 例子

### 默认例子

```html
<wv-group>
  <wv-cell title="default">
    <wv-spinner type="default" slot="ft"></wv-spinner>
    <wv-spinner type="snake" slot="ft"></wv-spinner>
  </wv-cell>
</wv-group>
```

### 指定大小

```html
<wv-group>
  <wv-cell title="default">
    <wv-spinner type="default" :size="25" slot="ft"></wv-spinner>
    <wv-spinner type="snake" :size="25" slot="ft"></wv-spinner>
  </wv-cell>
</wv-group>
```

### 指定颜色

```html
<wv-group>
  <wv-cell title="default">
    <wv-spinner type="default" color="red" slot="ft"></wv-spinner>
    <wv-spinner type="snake" color="red" slot="ft"></wv-spinner>
  </wv-cell>
</wv-group>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| type  | String  |  显示类型   | 'default','snake','double-snake','bar-circle','dot-circle'   |   'default'    |
| color  | String  |  颜色   |      |   '#ccc'    |
| size  | Number  |  尺寸，单位为 px   |      |   17    |
