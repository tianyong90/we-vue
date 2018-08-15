Tabbar
---
底部选项卡。

## 引入

```js
import { Tabbar, TabbarItem } from 'we-vue'

Vue.use(Tabbar).use(TabbarItem)
```

## 例子

```html
<template>
  <wv-tabbar>
    <wv-tabbar-item to="/" is-on>
      <span slot="icon" style="display: inline-block; position: relative;">
        <img class="weui-tabbar__icon" src="icon.png" slot="icon">
        <wv-badge style="position: absolute;top: -2px;right: -13px;">8</wv-badge>
      </span>
       微信
    </wv-tabbar-item>
    <wv-tabbar-item to="/tabbar">
      <img class="weui-tabbar__icon" src="icon.png" slot="icon"> 通讯录
    </wv-tabbar-item>
    <wv-tabbar-item to="/">
      <span slot="icon" style="display: inline-block; position: relative;">
        <img class="weui-tabbar__icon" src="icon.png" slot="icon">
        <wv-badge is-dot style="position: absolute;top: 0;right: -6px;">8</wv-badge>
      </span>
       发现
    </wv-tabbar-item>
    <wv-tabbar-item to="/profile">
      <img class="weui-tabbar__icon" src="icon.png" slot="icon"> 我
    </wv-tabbar-item>
  </wv-tabbar>
</template>
```

## API

- tabbar

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| fixed  | Boolean  |  是否固定   |      |   false    |

- tabbar-item

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| to  | String  |  跳转地址   |      |       |
| is-on  | Boolean  |  是否为当前选中   |      |   false    |

## Slots

- tabbar

|   name   |   描述    |
| :----: | :-----: |
| -  | 一个或多个 tabbar-item 组件  |

- tabbar-item

|   name   |   描述    |
| :----: | :-----: |
| -  | 选项卡项内容  |
