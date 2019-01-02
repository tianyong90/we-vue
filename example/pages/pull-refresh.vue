<template>
  <wv-pull-refresh @refresh="refresh">
    <div class="content">
      <p class="text">基础用法</p>
      刷新次数：{{ num }}
    </div>
  </wv-pull-refresh>
</template>

<script>
export default {
  data () {
    return {
      num: 0
    }
  },
  methods: {
    refresh (done) {
      setTimeout(() => {
        this.num++
        done()
      }, 500)
    }
  }
}
</script>

<style scoped lang="scss">
.content{
  padding:0 15px;
  .text{
    font-size: 14px;
    color: rgba(69,90,100,.6);
  }
}
</style>
