---
title: Toast
keywords: 'we-vue, toast'
description: ''
demo_url: //demo.wevue.org/toast
---

Toast

弹出提示。

## 引入

```js
import { Toast } from 'we-vue'
```

## 例子

### 基本示例

```js
Toast.success('操作成功');
Toast.fail('操作失败');
```

### 设置显示时长

```js
Toast.fail({
  duration: 1000,
  message: '操作失败'
})
```

### 纯文本提示

```js
Toast.text({
  duration: 1000,
  message: '操作失败'
})
```

### 加载提示

```js
Toast.loading('laoding')
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| icon  | String  |  图标类型   |      |   'success-no-circle'    |
| message  | String  |  提示文字   |      |       |
| duration  | Number  |  提示时间（毫秒）   |      |       |
