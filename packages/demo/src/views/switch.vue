<template>
  <div class="page">
    <div class="tips">
      switch 支持左右滑动和点击进行开关操作
    </div>

    <div class="standalone-switches">
      <w-switch v-model="switchValue1" :is-in-cell="false"/>
      <w-switch v-model="switchValue2" :is-in-cell="false" disabled/>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      switchValue1: true,
      switchValue2: false,
    }
  },
}
</script>

<style scoped lang="scss">
.tips {
  padding: 0.2rem 0.5rem;
  font-size: 13px;
  color: #555;
}

.standalone-switches {
  margin: 20px 0;
  display: flex;
  justify-content: center;

  .wv-switch {
    margin: 10px 20px;
  }
}
</style>
