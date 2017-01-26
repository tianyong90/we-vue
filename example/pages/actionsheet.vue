<template>
  <div class="page page-with-padding">
    <div class="buttons">
      <wv-button type="default" @click.native="showActionsheet('ios')">iOS ActionSheet</wv-button>
      <wv-button type="default" @click.native="showActionsheet('android')">Android ActionSheet</wv-button>
    </div>

    <wv-actionsheet :type="type" :actions="actions" cancel-text="取消" v-model="sheetVisible"></wv-actionsheet>
  </div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      type: 'ios',
      sheetVisible: false,
      actions: []
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
  },

  mounted () {
    this.actions = [
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