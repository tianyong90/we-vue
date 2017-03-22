<template>
  <div>
    <wv-textarea placeholder="请输入文本" :rows="1" :show-counter="false" v-model="content1"></wv-textarea>
    <wv-textarea placeholder="请输入文本" :rows="3" :show-counter="true" v-model="content2" :max-length="10"></wv-textarea>
  </div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      content1: '',
      content2: null
    }
  }
}
</script>
