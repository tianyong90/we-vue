---
title: Navbar
keywords: 'we-vue, navbar'
description: ''
demo_url: //demo.wevue.org/navbar
---

Navbar

顶部选项卡。

::: danger
本组件将在下一个大版本中正式废弃，请使用 Tabs 组件替代。
:::

## 引入

```js
import { Navbar, NavbarItem } from 'we-vue'

Vue.use(Navbar)
Vue.use(NavbarItem)
```

## 例子

### 基本示例

```html
<template>
  <wv-navbar v-model="selected" @change="changed" fixed>
    <wv-navbar-item id="item1">选项1</wv-navbar-item>
    <wv-navbar-item id="item2">选项2</wv-navbar-item>
    <wv-navbar-item id="item3">选项3</wv-navbar-item>
  </wv-navbar>
</template>
```

### 自定义激活项颜色

```html
<template>
  <wv-navbar v-model="selected" @change="changed" active-color="red">
    <wv-navbar-item id="item1">选项1</wv-navbar-item>
    <wv-navbar-item id="item2">选项2</wv-navbar-item>
    <wv-navbar-item id="item3">选项3</wv-navbar-item>
  </wv-navbar>
</template>
```

### 自定义激活指示线宽度

```html
<template>
  <wv-navbar v-model="selected" @change="changed" :line-width="1">
    <wv-navbar-item id="item1">选项1</wv-navbar-item>
    <wv-navbar-item id="item2">选项2</wv-navbar-item>
    <wv-navbar-item id="item3">选项3</wv-navbar-item>
  </wv-navbar>
</template>
```

### 禁用过渡动效 (v1.4.14 以上版本)

```html
<template>
  <wv-navbar v-model="selected" @change="changed" :animate="false">
    <wv-navbar-item id="item1">选项1</wv-navbar-item>
    <wv-navbar-item id="item2">选项2</wv-navbar-item>
    <wv-navbar-item id="item3">选项3</wv-navbar-item>
  </wv-navbar>
</template>
```

### 有禁用项

```html
<template>
  <wv-navbar v-model="selected" @change="changed">
    <wv-navbar-item id="item1">选项1</wv-navbar-item>
    <wv-navbar-item id="item2">选项2</wv-navbar-item>
    <wv-navbar-item id="item3" :disabled="disabled">选项3</wv-navbar-item>
  </wv-navbar>
</template>
```

## API

- navbar

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| fixed  | Boolean  |  是否固定   |      |   false    |
| color  | String  |  选项卡字色   |      |   '#333'    |
| background-color  | String  |  选项卡背景色   |      |   '#fff'    |
| active-color  | String  |  激活的选项卡项字色   |      |   '#2196f3'    |
| disabled-color  | String  |  禁用的选项卡项字色   |      |   '#cfcfcf'    |
| line-width  | Number  |  询问衬级宽度   |      |   2    |
| animate (v1.4.14 新增)  | Boolean  |  是否禁用过渡动效   |      |   false   |

- navbar-item

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| id  | String  |  选项卡项 ID   |      |       |
| disabled  | Boolean  |  是否禁用   |      |   false    |

## Slots

- navbar

|   name   |   描述    |
| :----: | :-----: |
| -  | 一个或多个 navbar-item 组件  |

- navbar-item

|   name   |   描述    |
| :----: | :-----: |
| -  | 选项卡项内容  |
