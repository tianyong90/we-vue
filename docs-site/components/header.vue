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
          <router-link to="/changelog">变更记录</router-link>
        </li>
        <li>
          <a href="https://github.com/tianyong90/we-vue" target="new">GitHub</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'doc-header',

    computed: {
      isHomepage () {
        return this.$route.path === '/'
      }
    }
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
    overflow: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: $header-height;
    background-color: $header-background-color;
    z-index: 100;

    .main {
      display: block;
      overflow: hidden;
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
  }

  .header-home {
    background-color: $header-home-background-color;

    .nav li a {
      color: #fff;
    }
  }
</style>
