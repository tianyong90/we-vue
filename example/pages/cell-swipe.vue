<template>
  <div class="page">
    <wv-group title="带说明的列表项">
      <wv-cell-swipe title="标题文字" value="说明">

      </wv-cell-swipe>
    </wv-group>
  </div>
</template>

<script type="text/babel">
  import imgIcon from '../assets/images/icon_tabbar.png'

  export default {
    data () {
      return {
        imgIcon
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
