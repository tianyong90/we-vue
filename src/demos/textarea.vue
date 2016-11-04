<template>
  <div>
    <vui-textarea placeholder="请输入文本" :row="1" :show-counter="false" v-model="content"></vui-textarea>
    <vui-textarea placeholder="请输入文本" :row="3" :show-counter="true" v-model="content"></vui-textarea>
  </div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      content: 'hello world'
    }
  },

  methods: {
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