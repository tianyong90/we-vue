<template>
  <div class="container-fluid doc-wrapper">
    <div class="row">
      <div class="col-md-2 d-none d-md-block bg-white sidebar">
        <div id="sidebarWrapper" class="sidebar-sticky">
          <ul>
            <li v-for="navItem in sidebarNav" :key="navItem.title" class="doc-nav__item">
              <h2 class="title" v-html="navItem.title" />
              <div v-for="(group, index) in navItem.groups" :key="index">
                <div v-if="group.groupName" class="group-name" v-text="group.groupName" />
                <ul class="sub-tree">
                  <li>
                    <router-link
                      v-for="subItem in group.list"
                      :key="subItem.title"
                      :to="subItem.path"
                      active-class="current"
                      v-text="subItem.title"
                    />
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="doc-content markdown-body col-md-6 col-lg-7 px-4 offset-md-2">
        <!--todo-->
        <div class="markdown-body" v-html="html"></div>
      </div>

      <div class="col-md-4 col-lg-3">
        <WevueDemo :url="attributes.demo_url || '//demo.wevue.org'" :sticky-top="0" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import 'highlight.js/styles/atom-one-dark.css'
import WevueDemo from '@/components/wevue-demo.vue'

// TODO: 引入 md 样式
// if (false) {
//   import('~/assets/css/typora-vue-theme/vue-dark.css')
// }

type loadedMdFileObj = {
  attributes: object
  html
}

declare module 'vue/types/vue' {
  interface Vue {
    attributes: any
  }
}

export default Vue.extend({
  components: {
    WevueDemo,
  },

  head() {
    return {
      title: this.attributes.title + ' - we-vue',
      meta: [{ hid: 'keywords', name: 'keywords', content: this.attributes.keywords }],
    }
  },

  data() {
    return {
      demoUrl: '//demo.wevue.org',
      sidebarTop: 71,
    }
  },

  async asyncData({ params }) {
    const { version, title } = params

    let res: loadedMdFileObj

    if (title === 'contributing' || title === 'troubleshooting') {
      res = await import(`../../../markdown/${title}.md`)
    } else if (title === 'changelog') {
      // @ts-ignore 特殊对待
      res = await import(`../../../../../CHANGELOG.md`)
    } else {
      res = await import(`../../../markdown/${version}/${title}.md`)
    }

    const { html, attributes } = res

    const { nav } = await import('@/config')

    const sidebarNav = nav[version]

    return {
      version,
      title,
      sidebarNav,
      html,
      attributes,
    }
  },

  created() {},

  mounted() {
    /* eslint-disable no-new */
    new PerfectScrollbar('#sidebarWrapper')

    // 侧栏菜单当前项自动滚动到可见区
    const containerSidebar = document.getElementById('sidebarWrapper') as HTMLElement
    const sidebarActiveItem = document.querySelector('#sidebarWrapper .current')
    containerSidebar.scrollTop = (sidebarActiveItem as HTMLElement).offsetTop
  },
})
</script>

<style scoped lang="scss">
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

.doc-content {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
