<template>
  <div class="page page-with-padding">
    <div class="buttons">
      <wv-button
        type="default"
        @click="showActionsheet('ios')"
      >
        iOS ActionSheet
      </wv-button>
      <wv-button
        type="default"
        @click="showActionsheet('android')"
      >
        Android ActionSheet
      </wv-button>
    </div>

    <wv-actionsheet
      :type="type"
      title="<h3 style='color: red;'>一个大标题</h3><p>最多两行</p>"
      :actions="actions"
      cancel-text="取消"
      v-model="actionsheetVisible"
    />
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      type: 'ios',
      actionsheetVisible: false,
      actions: []
    }
  },

  methods: {
    showActionsheet (type) {
      this.type = type
      this.actionsheetVisible = true
    },

    menuClick (key) {
      console.log(`menu ${key} clicked`)
    }
  },

  mounted () {
    this.actions = [
      {
        name: '示例菜单1',
        key: 'menu1',
        method: () => {
          this.menuClick('menu1')
        }
      },
      {
        name: '示例菜单2',
        key: 'menu2',
        method: () => {
          this.menuClick('menu2')
        }
      },
      {
        name: '示例菜单3',
        key: 'menu3',
        method: () => {
          this.menuClick('menu3')
        }
      }
    ]
  }
}
</script>

<style scoped lang="scss">
  .buttons {
    display: block;
    padding: 0 20px;
    margin: 20px auto;
  }
</style>
