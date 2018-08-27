<template>
  <div class="page">
    <div class="page__hd">
      <img :src="logoImg" class="logo">
      <h1 class="page__title">WE-VUE</h1>
    </div>
    <wv-search-bar placeholder="搜索组件" v-model="keyword" :result="filterResult">
      <wv-group v-show="keyword">
        <wv-cell v-for="item in filterResult" :key="item.name" :title="item.name" :to="item.path" is-link>
          <i class="cell-icon iconfont" :class="'icon-' + item.icon" slot="icon"/>
        </wv-cell>
      </wv-group>
    </wv-search-bar>

    <wv-group :title="navGroup.groupTitle" v-for="navGroup in navs" :key="navGroup.index">
      <wv-cell v-for="nav in navGroup.navItems" :key="nav.name" :to="nav.path" is-link :title="nav.name">
        <i class="cell-icon iconfont" :class="'icon-' + nav.icon" slot="icon"/>
        <wv-badge slot="ft" v-if="nav.status === 'todo'">Todo</wv-badge>
      </wv-cell>
    </wv-group>

    <div class="weui-footer footer-copyright">
      <p data-v-62fe346e="" class="weui-footer__text">Copyright © 2016 - 2018 <a href="http://www.miitbeian.gov.cn/">粤ICP备17009332号-1</a></p>
    </div>
  </div>
</template>

<script>
import { navs } from '../router'
import logoImg from '../assets/images/logo.png'

export default {
  data () {
    return {
      logoImg,
      navs,
      keyword: '',
      componentList: []
    }
  },

  mounted () {
    navs.map(navGroup => {
      this.componentList = this.componentList.concat(navGroup.navItems)
    })
  },

  computed: {
    filterResult () {
      return this.componentList.filter(value => new RegExp(this.keyword, 'i').test(value.name))
    }
  }
}
</script>

<style scoped lang="scss">
  .logo {
    display: block;
    margin: 0 auto;
    width: 75px;
  }

  .page__hd {
    padding: 40px;

    .page__title {
      text-align: center;
      font-size: 20px;
      font-weight: 400;
    }
  }

  .page {
    margin-bottom: 0;
  }

  .cell-icon {
    display: block;
    margin-right: 5px;
    color: #2196f3;
    overflow: hidden;
    font-size: 20px;
    width: 25px;
    text-align: center;
  }

  .footer-copyright {
    margin: 40px 0 20px;
  }
</style>
