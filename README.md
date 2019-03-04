<p align="center">
  <img width="120" height="120" src="https://raw.githubusercontent.com/tianyong90/we-vue/master/images/logo.png">
  <h2 align="center">WeVue, 不止是 Vue.js + weui!</h2>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/we-vue"><img src="https://img.shields.io/npm/v/we-vue.svg" alt="npm"></a>
  <a href="https://circleci.com/gh/tianyong90/we-vue"><img src="https://circleci.com/gh/tianyong90/we-vue.svg?style=svg"></a>
  <a href="https://github.com/standard/standard"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"></a>
  <a href="https://codecov.io/github/tianyong90/we-vue?branch=master"><img src="https://img.shields.io/codecov/c/github/tianyong90/we-vue/master.svg"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
  <a href="https://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square"></a>
</p>

we-vue 是一套基于 Vue.js 的移动关组件库，结合 weui 官方样式库，封装了一系列组件，适合微信公众号等移动端开发。

## 特性

* 35+ 个组件
* 尽可能全面的单元测试
* 详细的在线文档和示例
* 支持 Typescript

### [在线文档（https://wevue.org）](https://wevue.org)

### [在线示例（https://demo.wevue.org）](https://demo.wevue.org)

<div align="center">
  <img src="https://raw.githubusercontent.com/tianyong90/we-vue/master/images/qrcode-demo.png" width="180">
</div>

## 安装

```shell
// yarn 推荐
$ yarn add we-vue

// npm
$ npm install we-vue -S
```

## 开发

**we-vue3.0 版本开始使用 lerna 工具，以 monorepo 模式进行开发，packages 目录下包含了 demo, docs 以及 we-vue 三个包，分别为示例，在线文档和组件库。如果有兴趣参与贡献代码，需要对 lerna 有一定的了解。除此之外，3.0使用 Typescript 对组件包进行了重构，因此也需要一定的 TS 基础。**

1. 克隆代码

```shell
// GitHub
$ git clone https://github.com/tianyong90/we-vue.git

// 码云（为方便国内用户，本项目也托管到码云，码云仅作定期同步，不保证代码为最新）
$ git clone https://gitee.com/tianyong/we-vue.git
```

2. 安装依赖

```shell
$ cd we-vue && lerna bootstrap
```

3. 运行本地服务并开发

```shell
// 开发组件及 demo
$ yarn run dev

// 开发在线文档
$ yarn run dev:docs
```

## 参与贡献

对于对本项目作出过贡献的朋友表示诚挚的感谢！同时也感谢提出过建议或反馈 Bug 的朋友。:smile:

<a href="https://github.com/tianyong90/we-vue/graphs/contributors"><img src="https://opencollective.com/we-vue/contributors.svg?width=890" /></a>


如果你有兴趣参与贡献代码或者提出建议，请阅读 [贡献指南](.github/CONTRIBUTING.md)

## 感谢

本项目从创建到现在，参考了不少流行的 vue 组件库，其中最主要的有 Mint-UI, 有赞 vant 以及 Vuetify。部分代码移植于这些 MIT 开源项目，同时又涉及大量变动，未及一一标注。在此表示感谢！

## License

MIT
