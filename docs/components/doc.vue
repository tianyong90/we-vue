<template>
  <div class="doc-wrap">
    <div class="doc-nav">
      <ul>
        <li
          class="doc-nav__item"
          v-for="navItem in navs"
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
    <div class="demo-wrap" :style="{ top: demoWrapTop + 'px' }">
      <div class="mobile-top"/>
      <iframe id="iframe-demo" src="//demo.wevue.org" frameborder="0"/>
    </div>
  </div>
</template>

<script>
import { navs, demoUrlMap } from '../config'
import 'highlight.js/styles/github.css'

export default {
  data () {
    return {
      navs,
      demoWrapTop: 90
    }
  },

  mounted () {
    this.setIframeSrc('//demo.wevue.org/' + demoUrlMap.get(this.$route.name))

    // 右侧 DEMO 区实在 sticky 效果
    document.addEventListener('scroll', (e) => {
      const scrollDistance = Math.abs(document.body.getBoundingClientRect().top)
      if (scrollDistance >= 70) {
        this.demoWrapTop = scrollDistance + 20
      } else {
        this.demoWrapTop = 90
      }
    })
  },

  methods: {
    setIframeSrc (src) {
      let demoIframe = document.getElementById('iframe-demo')
      demoIframe.src = src
    }
  },

  watch: {
    '$route.name': function (val) {
      this.setIframeSrc('//demo.wevue.org/' + demoUrlMap.get(val))
    }
  }
}
</script>

<style scoped lang="scss">
  .doc-wrap {
    display: flex;
    width: 100%;
    background-color: #fff;

    .doc-nav {
      display: block;
      overflow: hidden;
      width: 220px;
      min-width: 220px;
      border-right: 1px solid #ececec;

      ul {
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
      padding: 1.5em 420px 1.5em 1.5em;
    }
  }

  .demo-wrap {
    display: block;
    overflow: hidden;
    width: 375px;
    min-width: 375px;
    z-index: 100;
    border-radius: 6px;
    background: #f2f2f2;
    box-sizing: border-box;
    right: 15px;
    position: absolute;
    box-shadow: #999 -3px 3px 20px;

    .mobile-top {
      display: block;
      overflow: hidden;
      width: 100%;
      height: 42px;
      background: url(../assets/mobile_top.jpg) left top no-repeat;
      background-size: contain;
    }

    iframe {
      width: 100%;
      height: 555px;
    }
  }
</style>
