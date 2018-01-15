<template>
  <div class="header" :class="{ 'header-home': isHomepage }">
    <div class="main">
      <router-link to="/" exact>
        <img class="logo" src="../assets/logo.png" alt="">
      </router-link>
      <ul class="nav">
        <li>
          <router-link to="/" exact>首页</router-link>
        </li>
        <li>
          <router-link to="/doc">文档</router-link>
        </li>
        <li>
          <a href="https://github.com/tianyong90/we-vue" target="new">GitHub</a>
        </li>
      </ul>

      <div class="version-picker"
           @mouseenter="onMouseenterVersion"
           @mouseleave="onMouseleaveVersion"
           v-if="false"
      >
        <span>v1.6.x</span>
        <ul class="dropdown" v-show="false">
          <li class="dropdown-item">v1.6.x</li>
          <li class="dropdown-item">v2.0</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'doc-header',

  data () {
    return {
      versionPickerVisible: false
    }
  },

  computed: {
    isHomepage () {
      return this.$route.path === '/'
    }
  },

  methods: {
    onMouseenterVersion () {
      this.versionPickerVisible = true
    },

    onMouseleaveVersion () {
      this.versionPickerVisible = false
    }
  },
}
</script>

<style scoped lang="scss">
  $header-height: 70px;
  $header-background-color: #fff;
  $header-home-background-color: #040f23;

  body {
    position: relative;
  }

  .header {
    display: block;
    overflow: visible;
    top: 0;
    left: 0;
    width: 100%;
    height: $header-height;
    background-color: $header-background-color;
    z-index: 100;

    .main {
      display: block;
      margin: 0 auto;
      width: 90vw;
    }

    .logo {
      display: block;
      float: left;
      width: 60px;
      height: 60px;
      margin: 5px 0;
    }

    .nav {
      display: block;
      padding: 0;
      float: left;
      margin: 0 0 0 100px;

      li {
        display: inline-block;

        a {
          color: #333;
          text-decoration: none;
          display: inline-block;
          padding: 0 1em;
          line-height: $header-height;

          &:hover {
            color: #41b883;
          }

          &.router-link-active {
            color: #41b883;
          }
        }
      }
    }

    .version-picker {
      display: inline-block;
      float: right;
      padding: 0 2em;
      background-color: #efefef;
      line-height: $header-height;
      position: relative;

      .dropdown {
        display: block;
        padding: 0;
        margin: 0;
        width: 100%;
        position: absolute;
        background-color: #fafafa;
        top: $header-height;
        left: 0;
        z-index: 2000;
        border: 1px solid #ccc;
        border-radius: 4px;

        &-item {
          display: block;
          padding: 0;
          margin: 0;
          text-align: center;
          line-height: 30px;
          height: 30px;
          cursor: pointer;

          &:hover {
            background-color: #bbb;
          }
        }
      }
    }
  }

  .header-home {
    background-color: $header-home-background-color;

    .nav li a {
      color: #fff;
    }

    .version-picker {
      display: none;
    }
  }
</style>
