<template>
  <div class="wv-swipe" :style="{ height: height + 'px' }">
    <div class="wv-swipe-wrapper" ref="wrapper" v-swipe:horizonal.lock="swipeConfig">
      <div class="page-container">
        <slot></slot>
      </div>
    </div>
    <div class="wv-swipe-indicators" v-show="showIndicators">
      <div class="wv-swipe-indicator" v-for="(page, $index) in pages" :key="$index" :class="{ 'is-active': $index === index }"></div>
    </div>
  </div>
</template>

<script>
  import { once, addClass, removeClass } from '../../utils/dom.js'
  import { swipeDirective } from '../../custom/event/swipe.js'

  export default {
    name: 'wv-swipe3',

    created () {
      this.dragState = {}
      //新增
      this.info = null
      this.dom = {
        $pages: null,
        $pageContainer: null,
        $indicators: null,
        $indicatorContainer: null,
        swipeItemWidth: null,
        actualSwipeValue: null,
      }
      this.status = {
        initLocker: false,
        rafLocker: false,
        edgeLocker: false,
        swipeCurrentOffset: null,
        swipeStartOffset: null
      };
      this.event = {
        onPageEnter: [],
        onPageLeave: [],
        onIndicatorEnter: [],
        onIndicatorLeave: [],
      };
      this.swipeConfig = {
        onSwipe: this.onSwipe,
        onSwipeDone: this.onSwipeDone
      };
    },

    data () {
      return {
        ready: false,
        dragging: false,
        userScrolling: false,
        animating: false,
        index: 0,
        pages: [],
        timer: null,
        reInitTimer: null,
        noDrag: false
      }
    },

    props: {
      height: {
        type: Number,
        default: 180
      },
      speed: {
        type: Number,
        default: 300
      },
      defaultIndex: {
        type: Number,
        default: 0
      },
      auto: {
        type: Number,
        default: 3000
      },
      continuous: {
        type: Boolean,
        default: false
      },
      showIndicators: {
        type: Boolean,
        default: true
      },
      noDragWhenSingle: {
        type: Boolean,
        default: true
      },
      prevent: {
        type: Boolean,
        default: false
      },

      //新增的
      gap: {
        type: Number,
        default: 10
      },
      swipeItemWidth: {
        type: Number,
        default: null
      }
    },

    mounted () {
      this.ready = true

      this.setTimer();
      this.reInitPages()
    },

    methods: {
      swipeItemCreated () {
        if (!this.ready) return

        clearTimeout(this.reInitTimer)
        this.reInitTimer = setTimeout(() => {
          this.reInitPages()
        }, 100)
      },

      swipeItemDestroyed () {
        if (!this.ready) return

        clearTimeout(this.reInitTimer)
        this.reInitTimer = setTimeout(() => {
          this.reInitPages()
        }, 100)
      },

      reInitPages () {
        let children = this.$children

        let pages = []
        let intDefaultIndex = Math.floor(this.defaultIndex)
        let defaultIndex = (intDefaultIndex >= 0 && intDefaultIndex < children.length) ? intDefaultIndex : 0
        this.index = defaultIndex;

        children.forEach(function (child, index) {
          pages.push(child.$el)

          removeClass(child.$el, 'is-active')

          if (index === defaultIndex) {
            addClass(child.$el, 'is-active')
          }
        })

        this.pages = pages;

        this.reSize();
        window.addEventListener('resize',this.reSize);
      },

      reSize (){
        var $pageContainer = this.$pageContainer = this.$el.querySelector('.page-container'),
            $swiper = this.$el.children[0],
            $pages = this.$pages = $pageContainer.children,
            $indicators = this.$indicators = this.$el.querySelector('.wv-swipe-indicators'),
            $indicatorContainer = this.$indicatorContainer,
            index = this.index,
            speed = this.speed,
            continuous = this.continuous,
            gap = this.gap,
            self = this,
            actualSwipeValue, swipeItemWidth;

        swipeItemWidth = this.dom.swipeItemWidth = this.swipeItemWidth || $swiper.clientWidth;
        actualSwipeValue = this.dom.actualSwipeValue = this.dom.swipeItemWidth + gap;
        this.status.swipeStartOffset = index * actualSwipeValue;

        requestAnimationFrame(function () {
          $pageContainer.classList.add('noneAnimation','subNoneAnimation');
          $swiper.classList.add('subNoneAnimation');
          $swiper.style['opacity'] = 0;
          $pages[index].classList.add('showing');
          requestAnimationFrame(function () {
            $pageContainer.style.width = ($pages.length * actualSwipeValue) + 'px';
            Array.prototype.forEach.call($pages, function ($page) {
              $page.style.width = swipeItemWidth + 'px';
              $page.style.marginRight = gap + 'px';
              
            });
            
            if(continuous){
              $swiper.classList.add('loop');
              Array.prototype.forEach.call($pages, function ($page ,i) {
                $page.currentPosition = i * swipeItemWidth ;
                $page.index = i;
                $page.style.transform = 'translate3d(' + $page.currentPosition + 'px,0,0)';
                $page.style.webkitTransition = 
                  `-webkit-transform ${speed}ms ease`;
              });
            }else{
              $pageContainer.style.webkitTransition = 
                `-webkit-transform${speed}ms ease`;
            }
            self.goTo(index);
            requestAnimationFrame(function(){
              $pageContainer.classList.remove('subNoneAnimation');
              setTimeout(function(){
                $swiper.style['opacity'] = 1;
                $swiper.classList.remove('subNoneAnimation');
              },50);
            });
          });
        });
      },

      goTo (page){
        var fromPage = this.index,
          $pageContainer = this.$pageContainer,
          $pages = this.$pages,
          self = this,
          swipeStartOffset;

        if(page === 'next')
          page = this.index + 1;
        else if(page === 'prev')
          page = this.index - 1;

        if (!this.continuous) {
          if(page > $pages.length-1 || page < 0 ) return;
        } else {
          if(page > $pages.length-1) page = 0;
          if(page < 0) page = $pages.length-1;
        }

        this.index = page;
        swipeStartOffset = this.status.swipeStartOffset = page * this.dom.actualSwipeValue;
        $pageContainer.addEventListener('transitionend', this.transitionendProcessor);

        requestAnimationFrame(function () {
          $pageContainer.classList.remove('noneAnimation');
          requestAnimationFrame(function () {
            self.animate(fromPage, page);
          });
        });
      },

      next () {
        this.goTo('next')
      },

      prev () {
        this.goTo('prev')
      },

      clearTimer () {
        clearInterval(this.timer)
        this.timer = null
      },

      setTimer (){
        if (this.auto > 0) {
          this.timer = setInterval(() => {
            if (!this.continuous && (this.index >= this.pages.length - 1)) {
              return this.clearTimer()
            }
            if (!this.dragging && !this.animating) {
              this.next()
            }
          }, this.auto)
        }
      },

      onSwipe (info){
        var $pageContainer = this.$pageContainer,
          $pages = this.$pages,
          continuous = this.continuous,
          actualSwipeValue = this.dom.actualSwipeValue,
          self = this,

          offset = self.status.swipeStartOffset - info.offset,
          i_to = (info.offset > 0) ? this.index - 1 : this.index + 1,
          i_from = this.index,
          maxOffset = ($pages.length - 1) * actualSwipeValue,
          needPass = false;
        
        // 更新状态
        this.dragging = true;
        this.animating = false;

        // 修正
        if (i_to < 0) i_to = $pages.length - 1;
        if (i_to > $pages.length - 1) i_to = 0;
        if (self.status.edgeLocker == 1) return;

        if (offset < 0) {
          offset = 0;
          needPass = true;
        } else if (offset > maxOffset) {
          offset = maxOffset;
          needPass = true;
        }
        self.status.swipeCurrentOffset = offset;

        if (!self.status.rafLocker) {
          self.status.rafLocker = true;
          requestAnimationFrame(function () {
            if (!self.status.initLocker) {
              self.status.initLocker = true;
      
              if (continuous)
                $pageContainer.classList.add('subNoneAnimation');
              else
                $pageContainer.classList.add('noneAnimation');
            }
            if (!continuous) {
              $pageContainer.style.transform = 
                `translate3d(${self.status.swipeCurrentOffset}px,0,0)`;
            } else {
              Array.prototype.forEach.call($pages,function($li){
                $li.style.transform = 
                  `translate3d(${$li.currentPosition + info.offset}px,0,0)`;
              });
            }

            self.status.rafLocker = false;
          });
        }
        if (needPass && !continuous) return needPass;
      },

      onSwipeDone (info){
        var $pageContainer = this.$pageContainer,
          $pages = this.$pages,
          swipeItemWidth = this.dom.swipeItemWidth,
          continuous = this.continuous,
          actualSwipeValue = this.dom.actualSwipeValue,
          self = this,

          needPass = false,
          maxOffset = ($pages.length - 1) * actualSwipeValue,
          i_from = this.index,
          i_to = i_from;

        // 状态更新
        this.animating = true;
        this.dragging = false;

        if (self.status.edgeLocker == 1) return;

        if (Math.abs(info.offset) / swipeItemWidth > 0.15 &&
          self.status.swipeCurrentOffset <= maxOffset &&
          self.status.swipeCurrentOffset >= 0
        ) {//跳转
          if (info.offset > 0) {
            if (self.index != 0 || continuous)
              self.index--;
            else
              needPass = true;
          } else {
            if (self.index < $pages.length - 1 || continuous)
              self.index++;
            else
              needPass = true;
          }

          i_to = (info.offset > 0) ? i_from - 1 : i_from + 1;
        } else
          needPass = true;
        
        if(continuous){
          if(i_to < 0){
            i_to = $pages.length-1;
            self.status.edgeLocker++;
          }else if (i_to > $pages.length - 1){
            i_to = 0;
            self.status.edgeLocker++;
          }
        }else if (i_to < 0 || i_to > $pages.length - 1)
          i_to = i_from;

        this.animate(i_from, i_to, info);
        if (needPass && !continuous) return needPass;
      },

      transitionendProcessor () {
        this.clearTimer();
        this.setTimer();
        this.animating = false;
        this.$pageContainer.removeEventListener('transitionend', this.transitionendProcessor);
      },

      animate (i_from, i_to, info){
        var $pageContainer = this.$pageContainer,
          $pages = this.$pages,
          index = this.index,
          continuous = this.continuous,
          actualSwipeValue = this.dom.actualSwipeValue,
          self = this,

          needPass = false,
          maxOffset = ($pages.length - 1) * actualSwipeValue,
          $showing = $pageContainer.querySelector('.showing');

        $pageContainer.addEventListener('transitionend', self.transitionendProcessor);

        self.status.swipeStartOffset = self.index * actualSwipeValue;
        requestAnimationFrame(function () {
          $showing && $showing.classList.remove('showing');

          if (self.index > $pages.length-1)
            $pages[0].classList.add('showing');
          else if(self.index < 0)
            $pages[$pages.length - 1].classList.add('showing');
          else
            $pages[i_to].classList.add('showing');

          if(!continuous){
            $pageContainer.classList.remove('noneAnimation');
            $pageContainer.style['transform'] = 'translate3d(' + -self.status.swipeStartOffset + 'px,0,0)';
          }else{
            var _loop = function(reset){
              if (!reset) $pageContainer.classList.remove('subNoneAnimation');

              Array.prototype.forEach.call($pages, function ($li,i) {
                $li.classList.add('noneAnimation');
                $li.currentPosition = ($li.index - self.index) * actualSwipeValue;
                $li.style.transform = 'translate3d(' + $li.currentPosition + 'px,0,0)';

                if(i == i_to || i == i_from)
                  $li.classList.remove('noneAnimation');
              });

              //如果是确认到达边缘修把另一头挪过来,这里重构一下
              function switchTo(where){
                var i, currentPosition;
                if(where === 'tial'){
                  i = $pages.length - 1;
                  currentPosition = (-1 - self.index) * actualSwipeValue;
                }else if(where === 'head'){
                  i = 0;
                  currentPosition = ($pages.length - self.index) * actualSwipeValue;
                }

                $pages[i].classList.add('noneAnimation');
                $pages[i].currentPosition = currentPosition;
                $pages[i].style.transform = 'translate3d(' + $pages[i].currentPosition + 'px,0,0)';
                requestAnimationFrame(function(){
                  $pages[i].classList.remove('noneAnimation');
                });
              }

              if (self.index == 0)
                switchTo('tial');
              else if (self.index == $pages.length - 1)
                switchTo('head');

              //溢出重置处理
              var animationEnd = function () {
                requestAnimationFrame(function () {
                  $pageContainer.classList.add('subNoneAnimation');

                  if (self.index > $pages.length - 1) {
                    self.index = 0;
                    once($pages[0], 'transitionend' ,animationEnd);
                  } else if (self.index < 0) {
                    self.index = $pages.length - 1;
                    once($pages[$pages.length - 1], 'transitionend' ,animationEnd);
                  }

                  Array.prototype.forEach.call($pages, function ($li) {
                    $li.currentPosition = ($li.index - self.index) * actualSwipeValue;
                    $li.style.transform = 'translate3d(' + $li.currentPosition + 'px,0,0)';
                  });

                  _loop(true);

                  requestAnimationFrame(function () {
                    $pageContainer.classList.remove('subNoneAnimation');
                    self.status.edgeLocker = 0;
                  });
                });
              };
              if (self.index > $pages.length - 1) {
                once($pages[0], 'transitionend' ,animationEnd.bind(null, info));
                $pages[0].classList.remove('noneAnimation');
                $pages[0].currentPosition = ($pages.length - self.index) * actualSwipeValue;
                $pages[0].style.transform = 'translate3d(' + $pages[0].currentPosition + 'px,0,0)';

              } else if (self.index < 0) {
                once($pages[$pages.length - 1], 'transitionend' ,animationEnd.bind(null, info));
                $pages[$pages.length - 1].classList.remove('noneAnimation');
                $pages[$pages.length - 1].currentPosition = (-1 - self.index) * actualSwipeValue;
                $pages[$pages.length - 1].style.transform = 'translate3d(' + $pages[$pages.length - 1].currentPosition + 'px,0,0)';
              }
            }

            _loop();
          }

          //重置locker
          self.status.rafLocker = false;
          self.status.initLocker = false;

          i_from === i_to && self.transitionendProcessor()
        });
      },
    },

    destroyed () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      if (this.reInitTimer) {
        clearTimeout(this.reInitTimer)
        this.reInitTimer = null
      }
    },

    watch: {
      index (val) {
        this.$emit('change', val)
      }
    },

    directives: {
      swipe: swipeDirective
    }
  }
</script>

<style scoped lang="scss">
  .wv-swipe {
    overflow: hidden;
    width: 100%;
    position: relative;

    .wv-swipe-wrapper {
      height: 100%;

      .page-container {
        height: 100%;
        overflow-y: hidden;
        will-change: transform;
        transition: all 0.2s ease 0s;

        div {
          position: relative;
          height: 100%;
          width:100vw;
          display: block;
          float: left;
          overflow-y: scroll;

          &.is-active {
            display: block;
            transform: none;
          }
        }
      }

      &.loop .page-container{
        will-change: unset;
        transition: none;
        position: relative;

        div {
          will-change: transform;
          transition: all 0.2s ease 0s;
          position: absolute;
        }
      }
    }

    .wv-swipe-indicators {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);

      .wv-swipe-indicator {
        display: inline-block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        margin: 0 4px;
        background-color: #000;
        opacity: 0.3;

        &.is-active {
          background-color: #fff;
        }
      }
    }
  }

  .noneAnimation , .subNoneAnimation * {
    transition: none!important;
  }

  *::-webkit-scrollbar{
    display: none;
  }
</style>
