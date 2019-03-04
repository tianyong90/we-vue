Button
---
按钮。

## 引入

```js
import { Button } from 'we-vue'

Vue.use(Button)
```

## 例子

### 默认样式

```html
<w-button type="primary">页面主要操作 Normal</w-button>
<w-button type="default">页面次要操作 Normal</w-button>
<w-button type="warn">警告类操作 Normal</w-button>
```

### 禁用状态

```html
<w-button type="primary" disabled>页面主要操作 Disabled</w-button>
<w-button type="default" disabled>页面次要操作 Disabled</w-button>
<w-button type="warn" disabled>警告类操作 Disabled</w-button>
```

### 显示加载指示状态

```html
<w-button type="primary" is-loading>页面主要操作 Loading</w-button>
<w-button type="default" is-loading>页面次要操作 Loading</w-button>
<w-button type="warn" is-loading>警告类操作 Loading</w-button>
```

### 扁平风格
```html
<w-button type="default" :plain="true">按钮</w-button>
<w-button type="default" :plain="true" disabled>按钮</w-button>
<w-button type="primary" :plain="true">按钮</w-button>
<w-button type="primary" :plain="true" disabled>按钮</w-button>
```

### 迷你按钮
```html
<w-button type="primary" :mini="true">按钮</w-button>
<w-button type="default" :mini="true">按钮</w-button>
<w-button type="warn" :mini="true">按钮</w-button>
```

## API

|     参数     |   类型    |   说明    |         可选值          |   默认值   |
| :--------: | :-----: | :-----: | :------------------: | :-----: |
|    type    | String  |   类型    | primary,default,warn | default |
| is-loading | Boolean | 显示为加载状态 |                      |  false  |
|  disabled  | Boolean |  禁用状态   |                      |  false  |
|    mini    | Boolean |  迷你按钮   |                      |         |
|   plain    | Boolean |  扁平按钮   |                      |  false  |
