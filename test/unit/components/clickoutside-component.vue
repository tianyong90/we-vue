<template>
  <div>
    <div class="item-1" v-clickoutside="onClickoutside1"></div>
    <div class="item-2" v-clickoutside="onClickoutside2"></div>
    <div class="item-3"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import Clickoutside from '@/utils/clickoutside'

Vue.use(Clickoutside)

export default {
  name: 'clickoutside-component',

  methods: {
    onClickoutside1 () {},

    onClickoutside2 () {}
  }
}
</script>
