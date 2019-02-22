TopTips
---
顶部提示条。

## 引入

```js
import { TopTips } from 'we-vue'
```

## 例子

```js
// 传入字符串
TopTips('提示信息')

// 传入对象
TopTips({
  message: '提示信息',
  duration: 5000
})

// 关闭
TopTips.close()
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| message  | String  |  提示文字   |      |       |
| duration  | Number  |  提示时间（毫秒）   |      |   3000    |
