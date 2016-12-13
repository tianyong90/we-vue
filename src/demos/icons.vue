<template>
  <div class="page-with-padding">
    <ul class="icon-list icon-list-big">
      <li v-for="type in iconTypeList">
        <vui-icon type="icon" :type="type" :large="true"></vui-icon>
        <div class="description">
          {{ type }}
        </div>
      </li>
    </ul>
    
    <div class="icon-list icon-list-small">
      <vui-icon v-for="type in iconTypeList" :type="type"></vui-icon>
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
.icon-list {
  display: block;
  overflow: hidden;
  list-style: none;
}

.icon-list-big {
  width: 80%;
  margin: 0 auto;

  .icon {
    display: block;
    float: left;
  }

  .description {
    display: block;
    float: left;
  }
}

.icon-list-samll {
  display: block;
  overflow: hidden;
  width: 80%;
  margin: 20px auto;
}
</style>