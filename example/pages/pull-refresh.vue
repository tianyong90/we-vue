<template>
  <wv-pull-refresh v-model="isLoading" @refresh="refresh">
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
      isLoading: false,
      num: 0
    }
  },
  methods: {
    refresh () {
      setTimeout(() => {
        this.isLoading = false
        this.num++
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
