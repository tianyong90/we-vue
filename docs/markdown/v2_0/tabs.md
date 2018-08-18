Tabs
---
选项卡。

## 引入

```js
import { Tabs, Tab } from 'we-vue'

Vue.use(Tabs).use(Tab)
```

## 例子

### 基本示例

```html
<wv-tabs v-model="active">
  <wv-tab v-for="index in 4" :title="'标签 ' + index">
    内容 {{ index }}
  </wv-tab>
</wv-tabs>
```

### 可滚动

默认情况下标签页多于 4 个时，可以横向滚动 tab，可通过设置 swipe-threshold 阈值，多于这个值时，tab 就支持横向滚动。

```html
<wv-tabs>
  <wv-tab v-for="index in 4" :title="'标签 ' + index">
    内容 {{ index }}
  </wv-tab>
</wv-tabs>
```

### 粘性布局（sticky）

```html
<wv-tabs sticky>
  <wv-tab v-for="index in 4" :title="'标签 ' + index">
    内容 {{ index }}
  </wv-tab>
</wv-tabs>
```

### 禁用标签

```html
<wv-tabs @disabled="onClickDisabled">
  <wv-tab v-for="index in 4" :title="'标签 ' + index" :disabled="index === 2">
    内容 {{ index }}
  </wv-tab>
</wv-tabs>
```

### 卡片式布局

```html
<wv-tabs type="card">
  <wv-tab v-for="index in 4" :title="'标签 ' + index">
    内容 {{ index }}
  </wv-tab>
</wv-tabs>
```

### 点击事件

```html
<wv-tabs @click="onClick">
  <wv-tab v-for="index in 4" :title="'标签 ' + index">
    内容 {{ index }}
  </wv-tab>
</wv-tabs>
```

```js
export default {
  methods: {
    onClick (index) {
      this.$toast.text(`点击 ${index}`)
    }
  }
}
```

### 滑动切换

```html
<wv-tabs swipeable>
  <wv-tab v-for="index in 4" :title="'标签 ' + index">
    内容 {{ index }}
  </wv-tab>
</wv-tabs>
```

### 自定义标签

```html
<wv-tabs>
  <wv-tab v-for="index in 4">
    <div slot="title">
      <wv-icon type="success-no-circle" :large="false" /> 
      标签 {{ index }}
    </div>
    内容 {{ index }}
  </wv-tab>
</wv-tabs>
```


## Tabs API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| type  | String  |  样式   |  line, card    |   line    |
| duration  | Number  |  切换动画时间，以秒为单位   |     |   0.2    |
| line-width  | Number  |  底部指示条宽度(px)   |     |    |
| swipe-threshold  | Number  |  滚动阈值，tab 超过该值时可以滚动   |     |  4  |
| sticky  | Boolean  | 是否使用粘性布局   |     |  false  |
| offset-top  | Number  | 粘性布局下与顶部的最小距离(px)   |     |  0  |
| swipeable  | Boolean  | 是否可以滑动内容切换 |     |  false |


## Tab API

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| title  | String  |  标题   |    |      |
| disabled  | Boolean  |  是否禁用  |    |   false   |

## Tab Slots

|   name   |   描述    |
| :----: | :-----: |
| -  | 标签页内容  |
| title  | 标题，可自定义  |

## Tabs Event

|   事件名   |   说明    | 参数 |
| :----: | :-----: | :----: |
| click  | 点击标签  | index: 标签索引, title: 标题 |
| change  | 当前激活标签改变  | index: 标签索引, title: 标题 |
| disabled  | 点击禁用的标签  | index: 标签索引, title: 标题 |
