<template>
  <div class="page">
    <wv-pull-down class="pull-down" @onLoad="loadMore">
      <wv-cell :title="item" v-for="item in list" :key="item"></wv-cell>
    </wv-pull-down>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        list: [],
        attempt: 0
      }
    },

    methods: {
      loadMore (success, error, noMore){
        if( this.attempt === 3 ){
          setTimeout(error, 800);
        }else if(this.attempt == 5 ){
          setTimeout(noMore, 800);
        }else{
          setTimeout(()=>{
            var start = this.list.length, i ;
            for(i = 0; i < 5; i++){
              this.list.push('标题'+(i+start));
            }
            
            success();
          }, 800);
        }
        this.attempt++;
      }
    }
  }
</script>

<style scoped lang="scss">
  .pull-down{
    height: 100vh;
  }
</style>
