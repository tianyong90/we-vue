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
  '对话框标题',
  message: 'hello world',
  skin: 'ios'
})
```

传入一个对象进行调用，可自定义更多参数

```js
Dialog({
  '对话框标题',
  message: 'hello world',
  skin: 'ios',
  showCancelBtn: false
})
```

Dialog 还提供了 `confirm`、`alert`两个方法，均返回一个 `Promise`

```js
Dialog.confirm('确定执行此操作?', '操作确认').then(action => {
  // 确定后要执行的内容
})
```

```js
Dialog.alert(message, title)
```

**可以使用 setDefaults() 方法设置 options 的默认值**

```js
Dialog.setDefaults({
  '一个标题',
  confirmText: '阔以',
  cancelText: '不行'
})
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| skin  | String  |  皮肤样式   | 'ios','android'   |   'ios'    |
| title  | String  |  标题   |      |       |
| message  | String  |  对话框消息   |      |       |
| confirmText  | String  |  确认按钮文字   |      | '确定'    |
| cancelText  | String  |  取消按钮文字   |      | '取消'    |
| showConfirmBtn | Boolean | 显示确认按钮 |      | true |
| showCancelBtn | Boolean | 显示取消按钮 |      | true |
