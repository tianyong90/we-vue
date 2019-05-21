---
title: Actionsheet
keywords: 'we-vue, actionsheet'
description: ''
demo_url: //demo.wevue.org/actionsheet
---

弹出式菜单。

## 引入

```js
import { ActionSheet } from 'we-vue'

Vue.use(ActionSheet)
```

## 例子

### 基本使用

```html
<w-actionsheet 
  type="ios" 
  :actions="actions" 
  cancel-text="取消" 
  v-model="sheetVisible"
 />
```

### 指定皮肤样式

```html
<w-actionsheet 
  type="android" 
  :actions="actions" 
  cancel-text="取消" 
  v-model="sheetVisible"
/>
```

### 带标题（仅 iOS 样式菜单支持）

```html
<w-actionsheet 
  type="ios" 
  title="<h3 style='color: red;'>一个大标题</h3><p>最多两行</p>" 
  :actions="actions" 
  cancel-text="取消" 
  v-model="sheetVisible"
/>
```

## API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| type  | String  |  皮肤样式   |   'ios', 'android'   |   'ios'    |
| title  | String  |  标题    |          |       |
| cancel-text  | String  |  取消菜单项文字    |          |   'Cancel'    |
| actions | Array | 菜单项 |      |  |

- **关于菜单标题 title**

  title 可以是单纯的文字，也可以是一个 html 标签，并且可以在这标签中写入行内样式以实现自定义菜单标题样式。

- **关于菜单项 actions**

  上面的 actions 属性用于配置 ActionSheet 需要显示的菜单项以及各菜单项点击后调用的回调函数。下面是一个最简单的配置示例，其中 `name` 表示菜单名，也即界面里菜单中显示的文字（建议不要太长），`method` 项可以设置一个函数，用于执行点击该菜单项后进行的业务逻辑。

  ```js
  const actions = [
    {
      name: '示例菜单1',
      method: () => {
        console.log('menu1 clicked')
      }
    },
    {
      name: '示例菜单2',
      method: () => {
        console.log('menu2 clicked')
      }
    },
    {
      name: '示例菜单3',
      method: () => {
        console.log('menu3 clicked')
      }
    }
  ]
  ```
