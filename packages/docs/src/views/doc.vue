<template>
  <div>
    <Header></Header>
    <div class="container-fluid doc-wrapper">
      <div class="row">
        <div
          class="col-md-2 d-none d-md-block bg-white sidebar"
        >
          <div class="sidebar-sticky" id="sidebarWrapper">
            <ul>
              <li
                class="doc-nav__item"
                v-for="navItem in nav[version]"
                :key="navItem.title"
              >
                <h2 class="title" v-html="navItem.title"/>
                <div
                  v-for="(group, index) in navItem.groups"
                  :key="index"
                >
                  <div
                    class="group-name"
                    v-text="group.groupName"
                    v-if="group.groupName"
                  />
                  <ul class="sub-tree">
                    <li>
                      <router-link
                        :to="subItem.path"
                        v-for="subItem in group.list"
                        :key="subItem.title"
                        v-text="subItem.title"
                        active-class="current"
                      />
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="doc-content col-md-6 col-lg-7 px-4 offset-md-2">
          <router-view/>
        </div>

        <div class="col-md-4 col-lg-3">
          <WevueDemo
            :url.sync="demoUrl"
            :sticky-top="0"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nav } from '../config'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import Header from '../components/header'
import WevueDemo from '../components/wevue-demo'

export default {
  components: {
    Header,
    WevueDemo
  },

  data () {
    return {
      version: this.$route.meta.version,
      nav: nav,
      demoUrl: '//demo.wevue.org',
      sidebarTop: 71
    }
  },

  mounted () {
    /* eslint-disable no-new */
    new PerfectScrollbar('#sidebarWrapper')

    this.demoUrl = this.$route.meta.demo_url
    this.version = this.$route.meta.version

    // 侧栏菜单当前项自动滚动到可见区
    const containerSidebar = document.getElementById('sidebarWrapper')
    const sidebarActiveItem = document.querySelector('#sidebarWrapper .current')
    containerSidebar.scrollTop = sidebarActiveItem.offsetTop
  },

  beforeRouteUpdate (to, from, next) {
    this.demoUrl = to.meta.demo_url
    this.version = to.meta.version

    next()
  }
}
</script>

<style scoped lang="scss">
@import "~github-markdown-css/github-markdown.css";
@import "~prism-themes/themes/prism-atom-dark.css";

.doc-wrapper {
  margin-top: 70px;
}

.sidebar {
  position: fixed;
  top: 70px;
  bottom: 0;
  left: 0;
  z-index: 100;
  flex: 0 0 220px;
  border-right: 1px solid #e0e0e0;
  background-color: #f00;
  padding: 0;

  .sidebar-sticky {
    position: sticky;
    top: 0;
    height: calc(100vh - 70px);
    padding-top: 0.5rem;
    overflow-x: hidden;
    overflow-y: auto;
  }

  ul {
    width: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .doc-nav__item {
    list-style: none;
    padding: 0;
    margin: 0;

    .title {
      font-size: 18px;
      font-weight: 500;
      color: #333;
      display: block;
      text-indent: 1em;
    }

    .group-name {
      display: block;
      font-size: 16px;
      font-weight: 500;
      color: #353535;
      text-indent: 1.5em;
      margin: 0.2em 0;
    }

    .sub-tree {
      li {
        display: block;
      }
    }

    a {
      font-size: 14px;
      display: block;
      color: #555;
      font-weight: 500;
      text-decoration: none;
      text-indent: 2em;
      padding: 0.5em;

      &:hover {
        color: darken(#41b883, 20%);
        background-color: lighten(#41b883, 45%);
      }

      &.current {
        color: darken(#41b883, 20%);
        background-color: lighten(#41b883, 40%);
        border-right: 3px solid #41b883;
      }
    }
  }
}
</style>
