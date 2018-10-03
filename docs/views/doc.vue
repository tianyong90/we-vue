<template>
  <div class="row doc-wrap">
    <div
      class="sidebar-wrapper col"
      id="sidebar"
    >
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
    <div class="doc-content col">
      <router-view/>
    </div>

    <div class="col demo-column">
      <wevue-demo
        :url.sync="demoUrl"
        :sticky-top="0"
      />
    </div>
  </div>
</template>

<script>
import { nav } from '../config'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import 'highlight.js/styles/atom-one-dark.css'

export default {
  components: {
    'wevue-demo': () => import('../components/wevue-demo.vue')
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
    new PerfectScrollbar('#sidebar')

    this.demoUrl = this.$route.meta.demo_url
    this.version = this.$route.meta.version

    // 侧栏菜单当前项自动滚动到可见区
    const containerSidebar = document.getElementById('sidebar')
    const sidebarActiveItem = document.querySelector('#sidebar .current')
    containerSidebar.scrollTop = sidebarActiveItem.offsetTop

    // 右侧 DEMO 区实在 sticky 效果
    document.addEventListener('scroll', () => {
      const scrollDistance = Math.abs(document.body.getBoundingClientRect().top)
      if (scrollDistance >= 71) {
        this.sidebarTop = 0
      } else {
        this.sidebarTop = 71 - scrollDistance
      }
    })
  },

  beforeRouteUpdate (to, from, next) {
    this.demoUrl = to.meta.demo_url
    this.version = to.meta.version

    next()
  }
}
</script>

<style scoped lang="scss">
  .sidebar-wrapper {
    display: flex;
    bottom: 0;
    width: 220px;
    flex: 0 0 220px;
    border-right: 1px solid #ececec;
    background-color: #fff;
    padding: 0;

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
        padding: .5em 0 .5em 1.5em;
      }

      .sub-title {
        font-size: 15px;
        font-weight: 500;
        color: #333;
        display: block;
        text-indent: 1em;
        margin: .2em 0;
      }

      .sub-tree {
        li {
          display: block;
        }
      }

      a {
        font-size: 14px;
        display: block;
        color: #444;
        text-decoration: none;
        background-color: #fff;
        text-indent: 2em;
        padding: .5em;

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

  .demo-column {
    flex: 0 0 410px;
    justify-content: center;
  }
</style>
