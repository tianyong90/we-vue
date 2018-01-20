<template>
  <div>
    <doc-header :version-picker-visible="true"/>
    <div class="doc-wrap">
      <div class="sidebar-wrapper" id="sidebar" :style="{ top: sidebarTop + 'px' }">
        <ul>
          <li
            class="doc-nav__item"
            v-for="navItem in nav[version]"
            :key="navItem.title"
          >
            <h2 class="title" v-html="navItem.title"/>
            <ul class="sub-tree">
              <li>
                <router-link
                  :to="subItem.path"
                  v-for="subItem in navItem.list"
                  :key="subItem.title"
                  v-text="subItem.title"
                  active-class="current"
                />
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="doc-content">
        <router-view/>
      </div>

      <wevue-demo :url.sync="demoUrl" :sticky-top="90"/>
    </div>
  </div>
</template>

<script>
import { nav } from '../config'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import 'highlight.js/styles/github.css'

export default {
  components: {
    'wevue-demo': () => import('./wevue-demo.vue')
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
    this.demoUrl = this.$route.meta.demo_url || '//demo.wevue.org/'

    new PerfectScrollbar('#sidebar')

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

  watch: {
    '$route': (val) => {
      this.demoUrl = val.meta.demo_url || '//demo.wevue.org/'

      this.version = val.meta.version
    }
  }
}
</script>

<style scoped lang="scss">
  .doc-wrap {
    display: flex;
    width: 100%;
    background-color: #fff;

    .sidebar-wrapper {
      position: fixed;
      overflow: auto;
      width: 220px;
      bottom: 0;
      min-width: 220px;
      border-right: 1px solid #ececec;
      background-color: #fff;

      ul {
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
            color: #2196f3;
            background-color: #efefef;
          }

          &.current {
            background-color: #ededed;
          }
        }
      }
    }

    .doc-content {
      display: block;
      width: 100%;
      overflow: hidden;
      padding: .5em 420px 1.5em 250px;
    }
  }
</style>
