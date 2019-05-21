---
title: Loadmore
keywords: 'we-vue, loadmore'
description: ''
demo_url: //demo.wevue.org/loadmore
---

Loadmore

加载更多。

## 引入

```js
import { Loadmore } from 'we-vue'

Vue.use(Loadmore)
```

## 例子

### 基本示例

```html
<w-loadmore></w-loadmore>
```

### 指定文字

```html
<w-loadmore type="line" text="loading"></w-loadmore>
```

### 点划线

```html
<w-loadmore type="lineDot" text="loading"></w-loadmore>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| type  | String  |  类型   |  'default', 'lineDot'    |   'default'    |
| text  | String  |  文字   |      |       |
