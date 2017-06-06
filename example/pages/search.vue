<template>
  <wv-search v-model="value" :result="filterResult"></wv-search>
</template>

<script>
  export default {
    data () {
      return {
        value: '',
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
    }
  }
</script>
