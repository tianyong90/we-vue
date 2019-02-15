Dialog
---
对话框。

## 引入

```js
import { Dialog } from 'we-vue'
```

## 例子

直接传入对话框标题和提示信息进行调用。

```js
Dialog({
  title: '对话框标题',
  message: 'hello world',
  skin: 'ios'
})
```

传入一个对象进行调用，可自定义更多参数

```js
Dialog({
  title: '对话框标题',
  message: 'hello world',
  skin: 'ios',
  showCancelButton: false
})
```

Dialog 还提供了 `confirm`、`alert`两个方法，均返回一个 `Promise`

```js
Dialog.confirm({
  title: title,
  message: '欢迎使用 we-vue!',
  skin,
  showCancelButton: true
}).then(() => {
  this.$root.message('confirmed')
}).catch(() => {
  this.$root.message('canceled')
})
```

```js
Dialog.alert({
  title: title,
  message: '欢迎使用 we-vue!'
})
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| skin  | String  |  皮肤样式   | 'ios','android'   |   'ios'    |
| title  | String  |  标题   |      |       |
| message  | String  |  对话框消息   |      |       |
| confirmButtonText  | String  |  确认按钮文字   |      | '确定'    |
| cancelButtonText  | String  |  取消按钮文字   |      | '取消'    |
| showConfirmButton | Boolean | 显示确认按钮 |      | true |
| showCancelButton | Boolean | 显示取消按钮 |      | true |
