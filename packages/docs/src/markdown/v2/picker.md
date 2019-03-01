Picker
---
多列选择器。

## 引入

```js
import { Picker } from 'we-vue'

Vue.use(Picker)
```

## 例子

### 基本示例

```html
<template>
  <div class="page page-with-padding">
    <wv-group title="选择器示例">
      <wv-cell title="单列(对象数组)" is-link :value="fruit.name" @click.native="fruitPickerShow = true" />
      <wv-cell title="多列" is-link :value="dayAndTime | pickerValueFilter" @click.native="dayPickerShow = true" />
    </wv-group>

    <wv-picker
      :visible.sync="fruitPickerShow"
      :columns="fruitColumns"
      value-key="name"
      @confirm="confirmPerson"
    />
    <wv-picker
      :visible.sync="dayPickerShow"
      :columns="dayColumns"
      @confirm="confirmDayTime"
    />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        fruitPickerShow: false,
        dayPickerShow: false,
        dayAndTime: [],
        fruit: [{name: 'Apple', age: 1}],
        fruitColumns: [
          {
            values: [
              {
                name: 'Apple',
                price: 1.3
              },
              {
                name: 'Banana',
                price: 2.0
              },
              {
                name: 'Orange',
                price: 10
              },
              {
                name: 'Pear',
                price: 0.5
              }
            ]
          }
        ],
        ticketColumns: [
          {
            values: [
              '汽车票',
              '飞机票',
              '火车票',
              '轮船票',
              '其它'
            ],
            defaultIndex: 2
          }
        ],
        dayColumns: [
          {
            values: [
              '星期一',
              '星期二',
              '星期三',
              '星期四',
              '星期五',
              '星期六',
              '星期日'
            ],
            defaultIndex: 0
          },
          {
            values: [
              '上午',
              '下午'
            ],
            defaultIndex: 0
          }
        ]
      }
    },

    methods: {
      onChange (picker, value) {
        this.$nextTick(() => {
          console.log(picker.getValues())
        })
      }
    }
  }
</script>
```

### 省市区三级联动

**省市区三级联运示例代码较多，不便于在文档中显示和查看，建议查看[相应示例的源码](https://github.com/tianyong90/we-vue/blob/v2/example/pages/picker.vue)**

:::tip
v3.x 版本中新增了省市区选择器，待正式版发布后，可考虑升级。
:::

picker 上注册了下列方法，最常见的使用场景就是在 change 事件中使用它们，以便获取或更改当前 picker 的值（包括获取/设置 column 的值）

- getColumnValue(index)：获取给定列目前被选中的值
- setColumnValue(index, value)：设定给定列被选中的值，该值必须存在于该列的备选值数组中
- getColumnValues(index)：获取给定列的备选值数组
- setColumnValues(index, values)：设定给定列的备选值数组
- getValues()：获取所有列目前被选中的值（分隔符列除外）
- setValues(values)：设定所有列被选中的值（分隔符列除外），该值必须存在于对应列的备选值数组中

## API

- picker

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| visible  | Bolean  |  是否显示   |      |   false    |
| confirm-text  | String  |  默认按钮文字   |      |   '确定'    |
| cancel-text  | String  |  取消按钮文字   |      |   '取消'    |
| columns  | Array  |  列数据   |      |       |
| value-kay  | String  |  当前选中项 key   |      |        |
| visible-item-count  | Number  |  可见选项数量   |      |  7   |

- picker-column

|   参数   |   类型    |   说明   | 可选值  |  默认值  |
| :----: | :-----: | :----: | :--: | :---: |
| divider  | Boolean  |  是否显示为分隔符   |      |   false    |
| content  | String  |  分隔符内容   |      |   ''    |
| values  | Array  |  选项值数组   |      |   []    |
| value-kay  | String  |  当前选中项 key   |      |       |

## Events

|   事件名   |   说明    |   参数   |
| :----: | :-----: | :----: |
| change  | 所选值改变  |  当前组件示例   |
| confirm  | confirm 按钮点击事件  |     |
| cancel  | cancel 按钮点击事件  |     |
