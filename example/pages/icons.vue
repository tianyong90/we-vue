<template>
  <div class="page-with-padding">
    <ul class="icon-list-big">
      <li v-for="type in iconTypeList">
        <wv-icon class="demo-icon-large" type="icon" :type="type" :large="true"></wv-icon>
        <div class="description">
          {{ type }}
        </div>
      </li>
    </ul>

    <div class="icon-list-small">
      <wv-icon v-for="type in iconTypeList" :type="type"></wv-icon>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      iconTypeList: [
        'success',
        'info',
        'warn',
        'waiting',
        'success-no-circle',
        'circle',
        'info-circle',
        'download',
        'cancel',
        'search'
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .icon-list-big {
    width: 80%;
    margin: 0 auto;
    padding: 0;
    margin-bottom: 40px;

    li {
      display: flex;
      padding: 0;
      margin: 1rem 0;

      .demo-icon-large {
        display: block;
        margin-right: 1rem;
      }

      .description {
        font-size: 1.5rem;
        display: block;
        float: left;
      }
    }
  }

  .icon-list-small {
    display: block;
    overflow: hidden;
    width: 80%;
    margin: 0 auto;
  }
</style>
