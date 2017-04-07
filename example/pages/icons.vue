<template>
  <div class="page page-with-padding">
    <ul class="icon-list-big">
      <li v-for="type in iconTypes">
        <wv-icon class="demo-icon-large" type="icon" :type="type" :large="true"></wv-icon>
        <label class="label" v-text="type"></label>
      </li>
    </ul>

    <div class="icon-list-small">
      <wv-icon :type="type" v-for="type in iconTypes"></wv-icon>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      iconTypes: [
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
      margin: 1.2rem 0;

      .demo-icon-large {
        display: block;
        margin-right: 1rem;
        font-size: 4rem;
      }

      .label {
        font-size: 1.1rem;
        display: block;
        float: left;
      }
    }
  }

  .icon-list-small {
    display: block;
    overflow: hidden;
    width: 80%;
    margin: 0 auto 20px;
  }
</style>
