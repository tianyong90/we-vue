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
    name: 'wv-swipe4',

    created () {
      this.dragState = {}
      //新增
      this.info = null
      this.dom = {
        $pages: null,
        $pageContainer: null,
        $indicators: null,
        $indicatorContainer: null,
        pageWidth: null,
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
        default: 0
      },
      itemWidth: {
        type: Number,
        default: null
      },
      handleOverflow: {
        type: Function,
        default: null
      },
      onEveryPageLeave: {
        type: Function,
        default: null
      },
      onEveryPageEnter: {
        type: Function,
        default: null
      },
      onEveryIndicatorLeave: {
        type: Function,
        default: null
      },
      onEveryIndicatorEnter: {
        type: Function,
        default: null
      }
    },

    mounted () {
      this.ready = true

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

        //新增
        var $pageContainer = this.$pageContainer = this.$el.querySelector('.page-container'),
            $swiper = this.$el.children[0],
            $pages = this.$pages = $pageContainer.children,
            $indicators = this.$indicators = this.$el.querySelector('.wv-swipe-indicators'),
            $indicatorContainer = this.$indicatorContainer,
            index = this.index,
            speed = this.speed,
            continuous = this.continuous,
            gap = this.gap,
            actualSwipeValue, pageWidth;

        pageWidth = this.dom.pageWidth = this.pageWidth || $pageContainer.clientWidth;
        actualSwipeValue = this.dom.actualSwipeValue = this.dom.pageWidth + gap,

        requestAnimationFrame(function () {
          $pageContainer.classList.add('noneAnimation','subNoneAnimation');
          $pageContainer.style['opacity'] = 0;
          $pages[index].classList.add('showing');
          requestAnimationFrame(function () {
            $pageContainer.style.width = ($pages.length * actualSwipeValue) + 'px';
            Array.prototype.forEach.call($pages, function ($page) {
              $page.style.width = pageWidth + 'px';
              $page.style.marginRight = gap + 'px';
              
            });
            $pageContainer.style['opacity'] = 1;
            
            if(continuous){
              $swiper.classList.add('loop','subNoneAnimation');
              Array.prototype.forEach.call($pages, function ($page ,i) {
                $page.currentPosition = i * pageWidth ;
                $page.index = i;
                $page.style.transform = 'translate3d(' + $page.currentPosition + 'px,0,0)';
                $page.style.webkitTransition = 
                  `-webkit-transform ${speed}ms ease`;
              });
              requestAnimationFrame(function(){
                $swiper.classList.remove('subNoneAnimation');
              });
            }else{
              $pageContainer.style.webkitTransition = 
                `-webkit-transform${speed}ms ease`;
            }
            requestAnimationFrame(function(){
              $pageContainer.classList.remove('subNoneAnimation');
            });
          });
        });
      },

      translate (element, offset, speed, callback) {
        if (speed) {
          this.animating = true
          element.style.webkitTransition = '-webkit-transform ' + speed + 'ms ease-in-out'
          setTimeout(() => {
            element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`
          }, 50)

          let called = false

          let transitionEndCallback = () => {
            if (called) return
            called = true
            this.animating = false
            element.style.webkitTransition = ''
            element.style.webkitTransform = ''
            if (callback) {
              callback.apply(this, arguments)
            }
          }

          once(element, 'webkitTransitionEnd', transitionEndCallback)
          setTimeout(transitionEndCallback, speed + 100) // webkitTransitionEnd maybe not fire on lower version android.
        } else {
          element.style.webkitTransition = ''
          element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`
        }
      },

      goTo (page){
        var fromPage = this.index,
          $pageContainer = this.$pageContainer,
          $pages = this.$pages,
          onEnter = this.onEnter,
          onLeave = this.onLeave,
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
            onEnter(page);
            onLeave(fromPage);
            self.animate(fromPage, page);
          });
        });
      },

      doAnimate (towards, options) {
        if (this.$children.length === 0) return
        if (!options && this.$children.length < 2) return

        let prevPage, nextPage, currentPage, pageWidth, offsetLeft
        let speed = this.speed || 300
        let index = this.index
        let pages = this.pages
        let pageCount = pages.length

        if (!options) {
          pageWidth = this.$el.clientWidth
          currentPage = pages[index]
          prevPage = pages[index - 1]
          nextPage = pages[index + 1]
          if (this.continuous && pages.length > 1) {
            if (!prevPage) {
              prevPage = pages[pages.length - 1]
            }
            if (!nextPage) {
              nextPage = pages[0]
            }
          }
          if (prevPage) {
            prevPage.style.display = 'block'
            this.translate(prevPage, -pageWidth)
          }
          if (nextPage) {
            nextPage.style.display = 'block'
            this.translate(nextPage, pageWidth)
          }
        } else {
          prevPage = options.prevPage
          currentPage = options.currentPage
          nextPage = options.nextPage
          pageWidth = options.pageWidth
          offsetLeft = options.offsetLeft
        }

        let newIndex

        let oldPage = this.$children[index].$el

        if (towards === 'prev') {
          if (index > 0) {
            newIndex = index - 1
          }
          if (this.continuous && index === 0) {
            newIndex = pageCount - 1
          }
        } else if (towards === 'next') {
          if (index < pageCount - 1) {
            newIndex = index + 1
          }
          if (this.continuous && index === pageCount - 1) {
            newIndex = 0
          }
        }

        let callback = () => {
          if (newIndex !== undefined) {
            let newPage = this.$children[newIndex].$el
            removeClass(oldPage, 'is-active')
            addClass(newPage, 'is-active')

            this.index = newIndex
          }

          if (prevPage) {
            prevPage.style.display = ''
          }

          if (nextPage) {
            nextPage.style.display = ''
          }
        }

        setTimeout(() => {
          if (towards === 'next') {
            this.translate(currentPage, -pageWidth, speed, callback)
            if (nextPage) {
              this.translate(nextPage, 0, speed)
            }
          } else if (towards === 'prev') {
            this.translate(currentPage, pageWidth, speed, callback)
            if (prevPage) {
              this.translate(prevPage, 0, speed)
            }
          } else {
            this.translate(currentPage, 0, speed, callback)
            if (typeof offsetLeft !== 'undefined') {
              if (prevPage && offsetLeft > 0) {
                this.translate(prevPage, pageWidth * -1, speed)
              }
              if (nextPage && offsetLeft < 0) {
                this.translate(nextPage, pageWidth, speed)
              }
            } else {
              if (prevPage) {
                this.translate(prevPage, pageWidth * -1, speed)
              }
              if (nextPage) {
                this.translate(nextPage, pageWidth, speed)
              }
            }
          }
        }, 10)
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

      onSwipe (info){
        var $pageContainer = this.$pageContainer,
          $pages = this.$pages,
          $inindicators = this.$indicators,
          $inindicatorContainer = this.$indicatorContainer,
          index = this.index,
          onEveryPageLeave = this.onEveryPageLeave,
          onLeave = this.onLeave,
          pageWidth = this.dom.pageWidth,
          handleOverflow = this.handleOverflow,
          continuous = this.continuous,
          transitionendProcessor = this.transitionendProcessor,
          actualSwipeValue = this.dom.actualSwipeValue,
          self = this,

          offset = self.status.swipeStartOffset - info.offset,
          i_to = (info.offset > 0) ? index - 1 : index + 1,
          i_from = index,
          percentage = Math.abs(info.offset / pageWidth),
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
        } else if (offset > ($pages.length - 1) * actualSwipeValue) {
          offset = ($pages.length - 1) * actualSwipeValue;
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

              self.onLeave(index);
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
            // if ((!needPass || continuous) && $ctrl){
            //   ctrlOnSlide(
            //     $ctrl.children[i_from],
            //     $ctrl.children[i_to],
            //     percentage,
            //     i_from,
            //     i_to
            //   );
            // }
          });
        }
        if (needPass && !continuous){
          if(handleOverflow instanceof Function)
            return handleOverflow(info);
          else
            return needPass;
        }
      },

      onSwipeDone (info){
        var $pageContainer = this.$pageContainer,
          $pages = this.$pages,
          index = this.index,
          onEveryPageLeave = this.onEveryPageLeave,
          pageWidth = this.dom.pageWidth,
          continuous = this.continuous,
          actualSwipeValue = this.dom.actualSwipeValue,
          self = this,

          needPass = false,
          maxOffset = ($pages.length - 1) * actualSwipeValue,
          i_from = index,
          i_to = i_from,
          $showing = $pageContainer.querySelector('.showing');

        // 状态更新
        this.animating = true;
        this.dragging = false;

        if (self.status.edgeLocker == 1) return;

        if (Math.abs(info.offset) / pageWidth > 0.15 &&
          self.status.swipeCurrentOffset <= maxOffset &&
          self.status.swipeCurrentOffset >= 0
        ) {//跳转
          if (info.offset > 0) {
            if (self.index != 0 || continuous)
              self.index--;
            else
              needPass = true;
          } else
            if (self.index < $pages.length - 1 || continuous)
              self.index++;
            else
              needPass = true;
        } else
          needPass = true;

        i_to = (info.offset > 0) ? i_from - 1 : i_from + 1;

        if(continuous){
          if(i_to < 0){
            i_to =  $pages.length-1;
            self.status.edgeLocker++;
          }else if (i_to > $pages.length - 1){
            i_to = 0;
            self.status.edgeLocker++;
          }
        }else
          if (i_to < 0 || i_to > $pages.length - 1)
            i_to = i_from;

        this.animate(i_from, i_to, info);

        if (needPass && !continuous)
          return needPass;
      },

      transitionendProcessor () {
        var $pageContainer = this.$pageContainer,
          $pages = this.$pages,
          index = this.index;

        // 状态更新
        this.animating = false;
      
        this.onEnter(index);
        
        requestAnimationFrame(function () {
          // 禁止滚动的处理不过这不是最好的办法来的,其实我希望可以同标记就可以默认禁用对应的事件了
          if (index > $pages.length - 1)
            $pages[0].style['overflow-y'] = 'auto';
          else if (index < 0)
            $pages[$pages.length - 1].style['overflow-y'] = 'auto';
          else
            $pages[index].style['overflow-y'] = 'auto';
        });

        $pageContainer.removeEventListener('transitionend', this.transitionendProcessor);
      },

      animate (i_from, i_to, info){
        var $pageContainer = this.$pageContainer,
          $pages = this.$pages,
          index = this.index,
          onEveryPageLeave = this.onEveryPageLeave,
          pageWidth = this.dom.pageWidth,
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
              
              if (!reset)
                $pageContainer.classList.remove('subNoneAnimation');

              Array.prototype.forEach.call($pages, function ($li,i) {
                $li.classList.add('noneAnimation');
                $li.currentPosition = ($li.index - self.index) * actualSwipeValue;
                $li.style.transform = 'translate3d(' + $li.currentPosition + 'px,0,0)';

                if(i == i_to || i == i_from)
                  $li.classList.remove('noneAnimation');
                
              });

              //如果是确认到达边缘修把另一头挪过来
              if (self.index == 0) {
                $pages[$pages.length - 1].classList.add('noneAnimation');
                $pages[$pages.length - 1].currentPosition = (-1 - self.index) * actualSwipeValue;
                $pages[$pages.length - 1].style.transform = 'translate3d(' + $pages[$pages.length - 1].currentPosition + 'px,0,0)';
                requestAnimationFrame(function(){
                  $pages[$pages.length - 1].classList.remove('noneAnimation');
                });
              } else if (self.index == $pages.length - 1) {
                $pages[0].classList.add('noneAnimation');
                $pages[0].currentPosition = ($pages.length - self.index) * actualSwipeValue;
                $pages[0].style.transform = 'translate3d(' + $pages[0].currentPosition + 'px,0,0)';
                requestAnimationFrame(function () {
                  $pages[0].classList.remove('noneAnimation');
                });
              }

              //溢出重置处理
              var animationEnd = function () {
                var info = arguments[0];
                requestAnimationFrame(function () {
                  $pageContainer.classList.add('subNoneAnimation');

                  if (self.index > $pages.length - 1) {
                    self.index = 0;
                    $pages[0].addEventListener('transitionend', animationEnd);
                  } else if (self.index < 0) {
                    self.index = $pages.length - 1;
                    $pages[$pages.length - 1].addEventListener('transitionend', animationEnd);
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
                $pages[0].addEventListener('transitionend', animationEnd.bind(null, info));
                // 需要维持位置一会儿
                $pages[0].classList.remove('noneAnimation');
                $pages[0].currentPosition = ($pages.length - self.index) * actualSwipeValue;
                $pages[0].style.transform = 'translate3d(' + $pages[0].currentPosition + 'px,0,0)';

              } else if (self.index < 0) {
                $pages[$pages.length - 1].classList.remove('noneAnimation');
                $pages[$pages.length - 1].addEventListener('transitionend', animationEnd.bind(null, info));
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

          // if ($ctrl){
          //   i_from = (i_from > $pages.length - 1) ? $pages.length - 1: i_from;
          //   i_from = (i_from < 0) ? 0 : i_from;

          //   if (i_from == self.index) {
          //     if (i_from != i_to){
          //       ctrlOnSlideDone(
          //         $ctrl.children[i_to],
          //         $ctrl.children[i_from],
          //         i_to,
          //         i_from
          //       );
          //     }
          //   } else{
          //     ctrlOnSlideDone(
          //       $ctrl.children[i_from],
          //       $ctrl.children[self.index],
          //       i_from,
          //       self.index
          //     );
          //   }
          // }
        });
      },

      onLeave (index){
        if (this.event.onPageLeave[index] instanceof Function)
          this.event.onPageLeave[index]();

        if (this.event.onIndicatorLeave[index] instanceof Function)
          this.event.onIndicatorLeave[index]();

        if (this.onEveryPageLeave instanceof Function)
          this.onEveryPageLeave(index);

        if (this.onEveryIndicatorLeave instanceof Function)
          this.onEveryIndicatorLeave(index);
      },

      onEnter (index){
        if (this.event.onPageEnter[index] instanceof Function)
          this.event.onPageEnter[index]();

        if (this.event.onIndicatorEnter[index] instanceof Function)
          this.event.onIndicatorEnter[index]();

        if (this.onEveryPageEnter instanceof Function)
          this.onEveryPageEnter(index);

        if (this.onEveryIndicatorEnter instanceof Function)
          this.onEveryIndicatorEnter(index);
      },

      onPageEnter (index , callback){
        this.event.onPageEnter[index] = callback;
      },

      onPageLeave (index , callback){
        this.event.onPageLeave[index] = callback;
      },

      onIndicatorEnter (index , callback){
        this.event.onIndicatorEnter[index] = callback;
      },

      onIndicatorLeave (index , callback){
        this.event.onIndicatorLeave[index] = callback;
      }

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
