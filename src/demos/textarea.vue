<template>
  <div>
    <vui-textarea placeholder="请输入文本" :rows="1" :show-counter="false" v-model="content1"></vui-textarea>
    <vui-textarea placeholder="请输入文本" :rows="3" :show-counter="true" v-model="content2" :max-length="10"></vui-textarea>
  </div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      content1: '',
      content2: ''
    }
  }
}
</script>

<style scoped lang="scss">
</style>