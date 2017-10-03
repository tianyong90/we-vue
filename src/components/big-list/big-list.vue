<template>
  <div class="wv-big-list" @scroll="_onScroll" ref="list">
    <div class="wv-big-list_head" ref="head"></div>
    <div class="wv-big-list_items">
      <div v-for="$index in lens" :key="$index" class="wv-big-list_item">{{$index}}</div>
    </div>
    <div class="wv-big-list_tail" ref="tail"></div>
  </div>
</template>

<script>
  export default {
    name: 'wv-big-list',

    created (){
      this.orders = [];
      this.movedItem = 0;
      this.movedPage = 0;
      this.lastScrollTop = 0;
    },

    props: {
      onShowLen:{
        type: Number,
        default: 10,
        required: true
      },
      items:{
        type: Array,
        required: true
      }
    },

    data () {
      return {
        lens : [],
      }
    },

    mounted () {
      for(var i = 0; i < this.onShowLen ; i++){
        this.lens.push(i);
        this.orders.push(i);
      }

      this.$nextTick(() => {
        this.$refs.items = this.$el.getElementsByClassName('wv-big-list_item');
        this.$itemHeight = this.$refs.items[0].clientHeight;
        this.$itemsHeight = this.$itemHeight * this.onShowLen;
        this.$listScrollHeight = this.$refs.list.scrollHeight;
        this.maxPage = Math.floor(this.$listScrollHeight / this.$itemsHeight);

        this._pageScroll();
      });
    },

    methods: {
      _onScroll (e){
        var scrollTop = this.$refs.list.scrollTop;
        var scrollOffset = Math.floor((scrollTop - this.$headHeight) / this.$itemHeight);
        var needItemScroll = Math.abs(scrollOffset) > Math.abs(this.movedItem);
        var directionDown = scrollTop > this.lastScrollTop;
        this.lastScrollTop = scrollTop;

        // 往下滚动
        if(directionDown){
          //page
          if(this.movedItem === this.onShowLen-1 && this.movedPage != this.maxPage){
            this.movedPage++;
            this._pageScroll();
          //item
          }else if(needItemScroll){
            this.movedItem++;
            this._moveItem(this.$refs.items[this.orders[0]], true)
            this.orders.push(this.orders.shift());
          }
        }else{
          console.log(scrollOffset,this.movedItem);
          //page
          if(this.movedItem === 0 && this.movedPage != 0){
            this.movedPage--;
            this._pageScroll();
          //item
          }else if(needItemScroll){
            this.movedItem--;
            this._moveItem(this.$refs.items[this.orders[this.orders.length-1]], false)
            this.orders.unshift(this.orders.pop());
            
          }
        }
      },

      _itemReset(){
        this.movedItem = 0;
        Array.prototype.forEach.call(this.$refs.items, ($item, index)=>{
          $item.style.transform = `translateY(0px)`;
          this.orders[index] = index;
        });
      },

      _pageScroll (){
        this.$headHeight = this.movedPage * this.$itemsHeight ;
        this.$tailHeight = this.$listScrollHeight - this.$itemsHeight * (this.movedPage + 1) - this.$headHeight;
        this.$refs.head.style.height = this.$headHeight + 'px';
        this.$refs.tail.style.height = this.$tailHeight + 'px';
        this._itemReset();
      },

      _moveItem ($item, bottom){
        var offset = this.$itemsHeight;
        offset *= bottom ? 1 : 0;
        $item.style.transform = `translateY(${offset}px)`;
      },

      _updateDom ($item) {

      }
    }
  }
</script>

<style scoped lang="scss">
  .wv-big-list{
    height: 100vh;
    overflow: auto;
  }
  .wv-big-list_head,
  .wv-big-list_tail{
    height: 50vh;
  }
  .wv-big-list_item{
    height: 10vh;
    width: 100%;
    position: relative;
    z-index: 1;
  }
</style>
