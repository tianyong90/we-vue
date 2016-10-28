<template>
  <div>
    <div class="buttons">
      <vui-button type="default" @click.native="showActionsheet('ios')">iOS ActionSheet</vui-button>
      <vui-button type="default" @click.native="showActionsheet('android')">Android ActionSheet</vui-button>
    </div>

    <vui-actionsheet :type="type" :actions="actions" cancel-text="取消" :visible="visible"></vui-actionsheet>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: 'ios',
      visible: false,
      actions: [{
        name: '示例菜单',
        method: 'menuClick'
      },
      {
        name: '示例菜单',
        method: 'menuClick'
      },
      {
        name: '示例菜单',
        method: 'menuClick'
      },
      {
        name: '示例菜单',
        method: 'menuClick'
      }]
    }
  },

  methods: {
    showActionsheet (type) {
      this.type = type
      this.visible = true
    },

    menuClick () {
      console.log(123)
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