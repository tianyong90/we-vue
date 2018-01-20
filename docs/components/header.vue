<template>
  <div class="header" :class="[theme]">
    <div class="header-main">
      <router-link to="/" exact>
        <img class="logo" src="../assets/logo.png" alt="">
      </router-link>
      <ul class="nav">
        <li>
          <router-link to="/" exact>首页</router-link>
        </li>
        <li>
          <router-link to="/doc/v1_6/index">文档</router-link>
        </li>
        <li>
          <a href="https://github.com/tianyong90/we-vue" target="new">GitHub</a>
        </li>
      </ul>

      <div class="version-picker"
           @mouseenter="onMouseenterVersion"
           @mouseleave="onMouseleaveVersion"
           v-if="versionPickerVisible"
      >

        <span>{{ version | versionText }}</span>
        <ul class="dropdown" v-show="dropDownVisible">
          <li class="dropdown-item" @click="changeVersion('v1_6')">v1.6</li>
          <li class="dropdown-item" @click="changeVersion('v2_0')">v2.0</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'doc-header',

  props: {
    versionPickerVisible: Boolean,
    theme: {
      type: String,
      default: 'light'
    }
  },

  data () {
    return {
      dropDownVisible: false,
      version: this.$route.meta.version
    }
  },

  methods: {
    onMouseenterVersion () {
      this.dropDownVisible = true
    },

    onMouseleaveVersion () {
      this.dropDownVisible = false
    },

    changeVersion (version) {
      this.$router.push(`/doc/${version}/index`)
    }
  },

  watch: {
    '$route' (newValue) {
      this.version = newValue.meta.version
    }
  },

  filters: {
    versionText: (value) => {
      return value.replace('_', '.')
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
    overflow: visible;
    top: 0;
    left: 0;
    width: 100%;
    height: $header-height;
    background-color: $header-background-color;
    z-index: 100;
    border-bottom: 1px solid #dfdfdf;

    .header-main {
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

    &.dark {
      background-color: #01061a;
      border-bottom: none;

      a {
        color: #fff !important;

        &:hover {
          color: #41b883 !important;
        }

        &.router-link-active {
          color: #41b883 !important;
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
</style>
