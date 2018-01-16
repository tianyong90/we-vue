Toast
---
弹出式提示。

## 引入

```js
import { Toast } from 'we-vue'
```

## 例子

### 默认

```js
Toast('success');
```

### 操作出错提示

```js
Toast({
  duration: 1000,
  message: '操作失败',
  icon: 'warn'
})
```

### 纯文本提示

```js
Toast({
  duration: 1000,
  message: '操作失败',
  type: 'text'
})
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| icon  | String  |  图标类型   |      |   'success-no-circle'    |
| type  | String  |  提示类型   |      |   'success'    |
| message  | String  |  提示文字   |      |       |
| duration  | Number  |  提示时间（毫秒）   |      |       |
