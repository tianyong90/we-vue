<template>
  <div class="page">
    <wv-group title="向左滑动呼出按钮">
      <wv-cell-swipe title="标题文字" :value="true">
        <wv-cell-swipe-button type="warn" slot="right" @click="deleteClicked">删除</wv-cell-swipe-button>
        <wv-cell-swipe-button type="default" slot="right" @click="readClicked">查看</wv-cell-swipe-button>
      </wv-cell-swipe>
    </wv-group>
  </div>
</template>

<script type="text/babel">
  export default {
    data () {
      return {}
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
