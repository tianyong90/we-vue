Indicator
---
加载提示。

## 引入

```js
import { Indicator } from 'we-vue'
```

## 例子

### 显示提示

```js
Indicator.open('Loading');
```

### 指定 spinner 类型

```js
Indicator.open({
    text: 'loading',
    spinnerType: 'snake'
});
```

### 关闭提示

```js
Indicator.close();
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| text  | String  |  提示文字   |      |       |
| spinnerType  | String  |  spinner 类型   |  'default','snake','double-snake','bar-circle','dot-circle'  |   'default'    |
