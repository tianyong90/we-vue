<template>
  <div>
    <wv-tabs v-model="activeIndex1" @change="changed" fixed>
      <wv-tab title="tab1">
        内容1
      </wv-tab>
      <wv-tab title="tab2">
        内容2
      </wv-tab>
      <wv-tab title="tab3">
        内容3
      </wv-tab>
    </wv-tabs>

    <wv-tabs v-model="activeIndex2" @change="changed" type="card">
      <wv-tab title="tab1">
        内容1
      </wv-tab>
      <wv-tab title="tab2">
        内容2
      </wv-tab>
      <wv-tab title="tab3">
        内容3
      </wv-tab>
    </wv-tabs>

  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex1: 0,
      activeIndex2: 1,
      activeIndex3: 0
    }
  },

  methods: {
    changed (index) {
      console.log(index)
    }
  }
}
</script>

<style scoped lang="scss">
  .demo-wrapper {
    display: block;
    overflow: hidden;
    margin: 100px 0 50px;

    .demo-label {
      display: block;
      font-size: 13px;
      color: #555;
      margin-bottom: .5em;
      text-align: center;
    }
  }
</style>
