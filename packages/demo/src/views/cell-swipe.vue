<template>
  <div class="page">
    <w-group title="默认">
      <w-cell-swipe title="标题文字" value="hello">
        <w-cell-swipe-button type="warn" slot="right" @click.native="deleteClicked">删除</w-cell-swipe-button>
        <w-cell-swipe-button type="default" slot="right" @click.native="readClicked">查看</w-cell-swipe-button>
      </w-cell-swipe>
    </w-group>

    <w-group title="图标按钮">
      <w-cell-swipe title="标题文字" value="hello">
        <w-cell-swipe-button type="warn" slot="right" @click.native="deleteClicked">
          <i class="iconfont icon-rubish"/>
        </w-cell-swipe-button>
        <w-cell-swipe-button type="default" slot="right" @click.native="readClicked">
          <i class="iconfont icon-view"/>
        </w-cell-swipe-button>
      </w-cell-swipe>
    </w-group>

    <w-group title="左侧带图标">
      <w-cell-swipe title="标题文字">
        <img :src="imgIcon" slot="icon" class="cell-icon">
        <w-cell-swipe-button type="warn" slot="right" @click.native="deleteClicked">删除</w-cell-swipe-button>
        <w-cell-swipe-button type="default" slot="right" @click.native="readClicked">查看</w-cell-swipe-button>
      </w-cell-swipe>
    </w-group>

    <w-group title="可跳转">
      <w-cell-swipe title="标题文字" is-link url="/">
        <w-cell-swipe-button type="warn" slot="right" @click.native="deleteClicked">删除</w-cell-swipe-button>
        <w-cell-swipe-button type="default" slot="right" @click.native="readClicked">查看</w-cell-swipe-button>
      </w-cell-swipe>
    </w-group>
  </div>
</template>

<script>
import imgIcon from '../assets/images/icon_tabbar.png'

export default {
  data () {
    return {
      imgIcon
    }
  },

  methods: {
    deleteClicked () {
      console.log('delete')
    },

    readClicked () {
      console.log('read')
    }
  }
}
</script>

<style scoped lang="scss">
.cell-icon {
  display: block;
  width: 20px;
  margin-right: 5px;
}
</style>
