<template>
  <div class="body with-padding">
    <ul>
      <li v-for="type in iconTypeList">
        <vui-icon :type="type" :large="true"></vui-icon>
        <div class="description">
          {{ type }}
        </div>
      </li>
    </ul>

    <vui-icon v-for="type in iconTypeList" :type="type"></vui-icon>
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
</style>