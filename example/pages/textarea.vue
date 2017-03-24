<template>
  <div>
    <wv-textarea placeholder="请输入文本" :rows="1" :show-counter="false" v-model="content1"></wv-textarea>
    <wv-textarea placeholder="请输入文本" :rows="3" v-model="content2" :max-length="10"></wv-textarea>

    <wv-group title="与 group 一起用">
      <wv-textarea placeholder="请输入文本" :rows="6" v-model="content1"></wv-textarea>
    </wv-group>
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
