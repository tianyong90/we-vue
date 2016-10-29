<template>
  <div>
    <div class="buttons">
      <vui-button type="default" @click.native="showActionsheet('ios')">iOS ActionSheet</vui-button>
      <vui-button type="default" @click.native="showActionsheet('android')">Android ActionSheet</vui-button>
    </div>

    <vui-actionsheet :type="type" :actions="actions" cancel-text="取消" v-model="sheetVisible"></vui-actionsheet>
  </div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      type: 'ios',
      sheetVisible: false,
      actions: [{
        name: '示例菜单',
        method: this.menuClick
      },
      {
        name: '示例菜单',
        method: this.menuClick
      },
      {
        name: '示例菜单',
        method: this.menuClick
      },
      {
        name: '示例菜单',
        method: this.menuClick
      }]
    }
  },

  methods: {
    showActionsheet (type) {
      this.type = type
      this.sheetVisible = true
    },

    menuClick () {
      console.log('menuClick')
    }
  }
}
</script>

<style scoped lang="scss">
  .buttons {
    display: block;
    width: 80%;
    margin:20px auto;
  }
</style>