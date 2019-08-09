<template>
  <div class="page">
    <wv-group title="默认">
      <wv-cell-swipe title="标题文字" value="hello">
        <wv-cell-swipe-button type="warn" slot="right" @click.native="deleteClicked">
          删除
        </wv-cell-swipe-button>
        <wv-cell-swipe-button type="default" slot="right" @click.native="readClicked">
          查看
        </wv-cell-swipe-button>
      </wv-cell-swipe>
    </wv-group>

    <wv-group title="图标按钮">
      <wv-cell-swipe title="标题文字" value="hello">
        <wv-cell-swipe-button type="warn" slot="right" @click.native="deleteClicked">
          <i class="iconfont icon-rubish" />
        </wv-cell-swipe-button>
        <wv-cell-swipe-button type="default" slot="right" @click.native="readClicked">
          <i class="iconfont icon-view" />
        </wv-cell-swipe-button>
      </wv-cell-swipe>
    </wv-group>

    <wv-group title="左侧带图标">
      <wv-cell-swipe title="标题文字">
        <img :src="imgIcon" slot="icon" class="cell-icon">
        <wv-cell-swipe-button type="warn" slot="right" @click.native="deleteClicked">
          删除
        </wv-cell-swipe-button>
        <wv-cell-swipe-button type="default" slot="right" @click.native="readClicked">
          查看
        </wv-cell-swipe-button>
      </wv-cell-swipe>
    </wv-group>

    <wv-group title="可跳转">
      <wv-cell-swipe title="标题文字" is-link url="/">
        <wv-cell-swipe-button type="warn" slot="right" @click.native="deleteClicked">
          删除
        </wv-cell-swipe-button>
        <wv-cell-swipe-button type="default" slot="right" @click.native="readClicked">
          查看
        </wv-cell-swipe-button>
      </wv-cell-swipe>
    </wv-group>
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
