贡献指南
---

非常欢迎你加入 WE-VUE 的开发，这份文件将帮助你了解开发流程。

---

## 开发

### 开始之前

请遵守以下准则：

- 代码需要通过 Eslint 规范检查。
- 使用 2 个空格缩进，不要使用 Tab 制表符缩进。
- 不要把逗号放在最前面。

### 工作流程

1. Fork [tianyong90/we-vue](https://github.com/tianyong90/we-vue)
2. 把库（repository）复制到电脑上，并安装所依赖的插件。

    ```bash
    git clone https://github.com/<your-github-username>/we-vue.git
    cd we-vue
    npm install
    ```

3. 新增一个功能分支。

    ```bash
    git checkout -b new_feature
    ```

4. 开始开发。
5. 推送（push）分支。

    ```bash
    git push origin new_feature
    ```

6. 建立一个新的合并申请（pull request）并描述变动。

### 注意事项

- 不要修改 `package.json` 的版本号。
- 代码必须通过 Eslint 代码规范检查，并请保留一些必要的注释。
- 在建立 PR 之前请进行变基（rebase）操作，确保与主仓库 master 分支无重大冲突。

## 反馈问题

当你在使用 WE-VUE 遇到问题时，你可以尝试在 [问题解答](http://wevue.org/doc/troubleshooting) 中寻找解答，或是在 [GitHub](https://github.com/tianyong90/we-vue/issues) 上进行反馈。

1. 描述具体问题及重现步骤。
3. 附上相关代码及调试信息。

[we-vue 项目地址](https://github.com/tianyong90/we-vue)
