<template>
  <div>
    <wv-search-bar
      class="search-bar-1"
      v-model="value1"
      :result="filterResult"
      @click-result="onClickResult"
      @search="onSearch"
    />

    <wv-search-bar
      class="search-bar-2"
      v-model="value2"
      result-text-key="name"
      :result="filterObjectResult"
      @click-result="onClickResult"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: '',
      value2: '',
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
      ],
      defaultObjectResult: [
        {
          name: 'Apple',
          id: 1
        },
        {
          name: 'Banana',
          id: 2
        },
        {
          name: 'Orange',
          id: 3
        },
        {
          name: 'Durian',
          id: 4
        },
        {
          name: 'Lemon',
          id: 5
        },
        {
          name: 'Peach',
          id: 6
        },
        {
          name: 'Cherry',
          id: 7
        },
        {
          name: 'Berry',
          id: 8
        },
        {
          name: 'Core',
          id: 9
        },
        {
          name: 'Fig',
          id: 10
        },
        {
          name: 'Haw',
          id: 11
        },
        {
          name: 'Melon',
          id: 12
        },
        {
          name: 'Plum',
          id: 13
        },
        {
          name: 'Pear',
          id: 14
        },
        {
          name: 'Peanut',
          id: 15
        },
        {
          name: 'Other',
          id: 16
        }
      ]
    }
  },

  computed: {
    filterResult () {
      return this.defaultResult.filter(value =>
        new RegExp(this.value1, 'i').test(value)
      )
    },

    filterObjectResult () {
      return this.defaultObjectResult.filter(value =>
        new RegExp(this.value2, 'i').test(value.name)
      )
    }
  },

  methods: {
    onSearch (val) {
      this.$toast.text('提交搜索：' + val)
    },

    onClickResult (item) {
      console.log(item)
    }
  }
}
</script>

<style scoped lang="scss">
.search-bar-2 {
  margin-top: 100px;
}
</style>
