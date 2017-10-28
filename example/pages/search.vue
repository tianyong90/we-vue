<template>
  <div>
    <wv-search v-model="value" :result="filterResult"></wv-search>
    <wv-search-bar></wv-search-bar>
    <wv-search-bar :fixedCancelBtn="true" placeholder="固定取消按钮"></wv-search-bar>
    <wv-search-bar v-model="value" placeholder="可以有默认值"></wv-search-bar>
    <wv-search-bar :showCancelBtn="false" placeholder="关闭删除小图标"></wv-search-bar>
    <wv-search-bar cancelBtnText="cancel" lang="en" placeholder="自定义取消按钮文本"></wv-search-bar>
    <wv-search-bar :autoFocus="true" placeholder="自动获取焦点取消按钮"></wv-search-bar>
    <wv-search-bar ref="searchBar" placeholder="也可以手动"></wv-search-bar>
    <wv-button type="primary" @click="_focus">获取焦点</wv-button>
  </div>
  
</template>

<script>
  export default {
    data () {
      return {
        value: '默认',
        defaultResult: [
          'Apple',
          'Banana',
          'Orange',
          'Durian',
          'Lemon',
          'Peach',
          'Cherry',
          'Berry',
          'Core',
          'Fig',
          'Haw',
          'Melon',
          'Plum',
          'Pear',
          'Peanut',
          'Other'
        ]
      }
    },

    computed: {
      filterResult () {
        return this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value))
      }
    },

    methods: {
      _focus (){
        this.$refs.searchBar.focus()
      }
    }
  }
</script>
