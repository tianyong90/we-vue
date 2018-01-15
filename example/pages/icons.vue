<template>
  <div class="page page-with-padding">
    <ul class="icon-list">
      <li v-for="type in iconTypes" :key="type">
        <wv-icon class="demo-icon-large" :type="type" large/>
        <wv-icon :type="type" :large="false"/>
        <label class="label" v-text="type"/>
      </li>
    </ul>
  </div>
</template>

<script>
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
  .icon-list {
    width: 100%;
    margin: 0 auto 40px;
    padding: 0;

    li {
      display: flex;
      padding: 0;
      margin: 1.2rem 0;

      .demo-icon-large {
        display: block;
        margin-right: 1rem;
        font-size: 3rem;
      }

      .label {
        font-size: 1.1rem;
        display: block;
        float: left;
        margin-left: 1em;
      }
    }
  }
</style>
