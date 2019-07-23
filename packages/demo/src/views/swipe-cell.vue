<template>
  <div class="page">
    <w-group title="默认">
      <w-swipe-cell title="标题文字" value="hello">
        <w-swipe-cell-button type="warn" slot="right" @click.native="deleteClicked">删除</w-swipe-cell-button>
        <w-swipe-cell-button type="default" slot="right" @click.native="readClicked">查看</w-swipe-cell-button>
      </w-swipe-cell>
    </w-group>

    <w-group title="图标按钮">
      <w-swipe-cell title="标题文字" value="hello">
        <w-swipe-cell-button type="warn" slot="right" @click.native="deleteClicked">
          <i class="iconfont icon-rubish"/>
        </w-swipe-cell-button>
        <w-swipe-cell-button type="default" slot="right" @click.native="readClicked">
          <i class="iconfont icon-view"/>
        </w-swipe-cell-button>
      </w-swipe-cell>
    </w-group>

    <w-group title="左侧带图标">
      <w-swipe-cell title="标题文字">
        <img :src="imgIcon" slot="icon" class="cell-icon">
        <w-swipe-cell-button type="warn" slot="right" @click.native="deleteClicked">删除</w-swipe-cell-button>
        <w-swipe-cell-button type="default" slot="right" @click.native="readClicked">查看</w-swipe-cell-button>
      </w-swipe-cell>
    </w-group>

    <w-group title="可跳转">
      <w-swipe-cell title="标题文字" is-link url="/">
        <w-swipe-cell-button type="warn" slot="right" @click.native="deleteClicked">删除</w-swipe-cell-button>
        <w-swipe-cell-button type="default" slot="right" @click.native="readClicked">查看</w-swipe-cell-button>
      </w-swipe-cell>
    </w-group>
  </div>
</template>

<script>
import imgIcon from '../assets/images/icon_tabbar.png'

export default {
  data () {
    return {
      imgIcon,
    }
  },

  methods: {
    deleteClicked () {
      console.log('delete')
    },

    readClicked () {
      console.log('read')
    },
  },
}
</script>

<style scoped lang="scss">
.cell-icon {
  display: block;
  width: 20px;
  margin-right: 5px;
}
</style>
