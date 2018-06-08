快速上手
-----

本文将介绍如果在项目中使用 WeVue。

1. 创建一个 vue.js 项目，我们使用 Vue 官方肢手架工具 vue-cli

```bash
npm install -g vue-cli
vue init webpack <your_projectname>
```

2. 引入 WeVue


- 完整引入

在入口文件 main.js 中编写如下内容：

```js
import Vue from 'vue'
import WeVue from 'we-vue'
import 'we-vue/lib/style.css'
import App from './App.vue'

Vue.use(WeVue)

new Vue({
  el: '#app',
  render: h => h(App)
})
```
如此即完成了 WeVue 的引入。

- 按需引入
可以借助 babel-plugin-import 实现按需引入，以减小项目体积。
首先，安装 babel-plugin-import:

```shell
npm install babel-plugin-import -D
```

然后修改 .babelrc:

```json
{
  "presets": [
    ["es2015", { "modules": false }]
  ],
  "plugins": [["import", [
    {
      "libraryName": "we-vue",
      "style": "style.css"
    }
  ]]]
}
```

配置完成之后便可以按需引入需要的组件，例如引入 Group 和 Cell，代码如下:

```js
import Vue from 'vue'
import { Group, Cell } from 'we-vue'
import App from './App.vue'

Vue.use(Group)
Vue.use(Cell)
/* 或写为
 * Vue.use(Group)
 * Vue.use(Cell)
 */

new Vue({
  el: '#app',
  render: h => h(App)
})
```

3. 开始使用

运行 `npm run dev` 启动本地服务器进行开发。

运行 `npm run build` 进行编译。
