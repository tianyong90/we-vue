<template>
  <div class="wv-swipe" :style="{ height: height + 'px' }">
    <div class="wv-swipe-wrapper" ref="wrapper">
      <ul class="item-container">
        <slot></slot>
      </ul>
    </div>
    <div class="wv-swipe-indicators" v-show="showIndicators">
      <div class="wv-swipe-indicator" v-for="(page, $index) in pages" :key="$index" :class="{ 'is-active': $index === index }"></div>
    </div>
  </div>
</template>

<script>
  import { once, addClass, removeClass } from '../../utils/dom.js'

  export default {
    name: 'wv-swipe2',

    created () {
      this.dragState = {},
      //看来这里不是存这些状态的哦,原本是存储在dragState里面的
      this.swipeDirection = null,
      this.swipeOffset = 0,
      this.swipeOffsetStart = 0,
      this.swipeStart = {
        x:null,
        y:null
      },
      this.locker = {
        init:false,
        raf:false
      },
      this.slideWidth = null,

      this.$ul = null,
      this.$lis = null,
      this.info = null,
      this.$ctrl = null
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
      direction: {
        type: String,
        default: 'horizontal'
      },
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

      let element = this.$el;

      element.addEventListener('touchstart', (event) => {
        var touch = event.touches[0],
          swipeStart = this.swipeStart;

        swipeStart.x = touch.pageX;
        swipeStart.y = touch.pageY;
        this.swipeDirection = null;
        this.locker.init = false;
        this.locker.raf = false;
        // this.onTouchStart(event)
      })

      element.addEventListener('touchmove', function(event){
        var touch = event.touches[0],
          swipeStart = this.swipeStart;

        this.info = {
          offset: (this.direction == 'horizontal') ? touch.pageX - swipeStart.x : touch.pageY - swipeStart.y
        };

        if(this.swipeDirection == null){
          this.swipeDirection = (Math.abs(touch.pageX - swipeStart.x) > Math.abs(touch.pageY - swipeStart.y)) ? 'horizontal' : 'vertical';
        }
        //锁定
        if(this.swipeDirection == this.direction){
          event.preventDefault();
          this.onTouchMove(event, this.info);
        }
      }.bind(this))

      element.addEventListener('touchend', (event) => {
        this.onTouchEnd(event, this.info);
      })
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

      reInitPages () {
        let children = this.$children
        let $slider = this.$el.children[0];

        let pages = []
        let intDefaultIndex = Math.floor(this.defaultIndex)
        let defaultIndex = (intDefaultIndex >= 0 && intDefaultIndex < children.length) ? intDefaultIndex : 0
        this.index = defaultIndex
        this.continuous && $slider.classList.add('loop');

        this.pages = pages
        
        this.$ul = this.$el.querySelector('ul');
        this.$lis = this.$ul.children;

        var slideWidth ,
          $ul = this.$ul ,
          $lis = this.$lis;

        this.itemWidth == null && (this.itemWidth = $ul.clientWidth);
        slideWidth = this.slideWidth = this.itemWidth + this.gap;

        requestAnimationFrame(function () {
          $ul.style['width'] = ($lis.length * slideWidth) + 'px';
          children.forEach(function (child, index) {
            pages.push(child.$el)

            removeClass(child.$el, 'is-active')

            if (index === defaultIndex) {
              addClass(child.$el, 'is-active')
            }

            var $li = child.$el;
        
            $li.style['width'] = this.itemWidth + 'px';
            $li.style['margin-right'] = this.gap + 'px';

            if(this.continuous){
              $li.currentPosition = index * slideWidth ;
              $li.index = index;
              $li.style.transform = 'translate3d(' + $li.currentPosition + 'px,0,0)';
            }
          },this);
        }.bind(this));

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
        this.doAnimate('next')
      },

      prev () {
        this.doAnimate('prev')
      },

      onTouchStart (event) {
        var element = this.$el;
        element.style.willChange = 'transform';
        element.style.transitionDuration = '0ms';
      },

      onTouchMove (event, info) {
        var offset = this.swipeOffsetStart - info.offset, 
          //这里需要以后根据direction来做判断
          next = (info.offset > 0) ? this.index - 1 : this.index + 1,
          from = this.index,
          percentage = Math.abs(info.offset / this.itemWidth),
          needPass = false,
          $ul = this.$ul,
          $lis = this.$lis,
          slideWidth = this.slideWidth;

        //修正
        if(next < 0) next = $lis.length - 1;
        if (next > $lis.length - 1) next = 0;

        if (this.index < 0 || this.index > $lis.length - 1)
          return;

        //修正
        if (offset < 0) {
          offset = 0;
          needPass = true;
        } else if (offset > ($lis.length - 1) * slideWidth) {
          offset = ($lis.length - 1) * slideWidth;
          needPass = true;
        }

        this.swipeOffset = offset;

        if (!this.locker.raf) {
          this.locker.raf = true;
          requestAnimationFrame(function () {
            if (!this.locker.init) {
              this.locker.init = true;
      
              if(this.continuous)
                $ul.classList.add('subNoneAnimation');
              else
                $ul.classList.add('noneAnimation');

              if (this.onEveryPageLeave instanceof Function)
                this.onEveryPageLeave(this.index);
              
              // if (onLeave[this.index])
              //   onLeave[this.index]();
            }
            if(!this.continuous){
              $ul.style.transform = 'translate3d(' + -offset + 'px,0,0)';
            }else{
              Array.prototype.forEach.call($lis,function($li){
                $li.style.transform = 'translate3d(' + ($li.currentPosition + info.offset) + 'px,0,0)';
              });
            }

            this.locker.raf = false;
          }.bind(this));
        }
        if (needPass && !this.continuous){
          if(this.handleOverflow instanceof Function)
            this.handleOverflow(info);
        }else
          event.preventDefault();
      },

      onTouchEnd (event ,info) {
        var needToPass = false,
          slideWidth = this.slideWidth,
          $ul = this.$ul,
          $lis = this.$lis,
          $ctrl = this.$ctrl,
          max_offset = ($lis.length - 1) * slideWidth,
          i_from = this.index,
          i_to = i_from,
          $showing = $ul.querySelector('.showing');

        if (Math.abs(info.offset) / this.itemWidth > 0.15 &&
          this.swipeOffset <= max_offset &&
          this.swipeOffset >= 0
        ) {//跳转
          if (info.offset > 0) {
            if (this.index != 0 || this.continuous)
              this.index--;
            else
              needToPass = true;
          } else
            if (this.index < $lis.length - 1 || this.continuous)
              this.index++;
            else
              needToPass = true;
        } else
          needToPass = true;

        i_to = (info.offset > 0) ? i_from - 1 : i_from + 1;

        if(this.continuous){
          if(i_to < 0)
            i_to =  $lis.length-1;
          else if (i_to > $lis.length - 1)
            i_to = 0;
        }else
          if (i_to < 0 || i_to > $lis.length - 1)
            i_to = i_from;

        $ul.addEventListener('transitionend', this.transitionendProcessor);

        this.swipeOffsetStart = this.index * slideWidth;
        requestAnimationFrame(function () {
          $showing && $showing.classList.remove('showing');

          if (this.index > $lis.length-1)
            $lis[0].classList.add('showing');
          else if(this.index < 0)
            $lis[$lis.length - 1].classList.add('showing');
          else
            $lis[this.index].classList.add('showing');

          if(!this.continuous){
            $ul.classList.remove('noneAnimation');
            $ul.style['transform'] = 'translate3d(' + -this.swipeOffsetStart + 'px,0,0)';
          }else{
            var _loop = function(reset){
              if (!reset)
                $ul.classList.remove('subNoneAnimation');

              Array.prototype.forEach.call($lis, function ($li,i) {
                $li.classList.add('noneAnimation');
                $li.currentPosition = ($li.index - this.index) * slideWidth;
                $li.style.transform = 'translate3d(' + $li.currentPosition + 'px,0,0)';

                if(i == i_to || i == i_from)
                  $li.classList.remove('noneAnimation');
                
              }.bind(this));

              //如果是确认到达边缘修把另一头挪过来
              if (this.index == 0) {
                $lis[$lis.length - 1].classList.add('noneAnimation');
                $lis[$lis.length - 1].currentPosition = (-1 - this.index) * slideWidth;
                $lis[$lis.length - 1].style.transform = 'translate3d(' + $lis[$lis.length - 1].currentPosition + 'px,0,0)';
                requestAnimationFrame(function(){
                  $lis[$lis.length - 1].classList.remove('noneAnimation');
                });
              } else if (this.index == $lis.length - 1) {
                $lis[0].classList.add('noneAnimation');
                $lis[0].currentPosition = ($lis.length - this.index) * slideWidth;
                $lis[0].style.transform = 'translate3d(' + $lis[0].currentPosition + 'px,0,0)';
                requestAnimationFrame(function () {
                  $lis[0].classList.remove('noneAnimation');
                });
              }

              //溢出重置处理
              var animationEnd = function () {
                var info = arguments[0];
                requestAnimationFrame(function () {
                  $ul.classList.add('subNoneAnimation');

                  if (this.index > $lis.length - 1) {
                    this.index = 0;
                    $lis[0].addEventListener('transitionend', animationEnd);
                  } else if (this.index < 0) {
                    this.index = $lis.length - 1;
                    $lis[$lis.length - 1].addEventListener('transitionend', animationEnd);
                  }

                  Array.prototype.forEach.call($lis, function ($li) {
                    $li.currentPosition = ($li.index - this.index) * slideWidth;
                    $li.style.transform = 'translate3d(' + $li.currentPosition + 'px,0,0)';
                  }.bind(this));

                  _loop(true);

                  requestAnimationFrame(function () {
                    $ul.classList.remove('subNoneAnimation');
                  });
                }.bind(this));
              }.bind(this);
              if (this.index > $lis.length - 1) {
                $lis[0].addEventListener('transitionend', animationEnd.bind(null, info));
                //需要维持位置一会儿
                $lis[0].classList.remove('noneAnimation');
                $lis[0].currentPosition = ($lis.length - this.index) * slideWidth;
                $lis[0].style.transform = 'translate3d(' + $lis[0].currentPosition + 'px,0,0)';

              } else if (this.index < 0) {
                $lis[$lis.length - 1].classList.remove('noneAnimation');
                $lis[$lis.length - 1].addEventListener('transitionend', animationEnd.bind(null, info));
                $lis[$lis.length - 1].currentPosition = (-1 - this.index) * slideWidth;
                $lis[$lis.length - 1].style.transform = 'translate3d(' + $lis[$lis.length - 1].currentPosition + 'px,0,0)';
              }
            }.bind(this);

            _loop();
          }

          //重置locker
          this.locker.raf = false;
          this.locker.init = false;

          if(i_from == i_to)
            this.transitionendProcessor();

          if ($ctrl){
            i_from = (i_from > $lis.length - 1) ? $lis.length - 1: i_from;
            i_from = (i_from < 0) ? 0 : i_from;

            if (i_from == this.index) {
              if (i_from != i_to){
                ctrlOnSlideDone(
                  $ctrl.children[i_to],
                  $ctrl.children[i_from],
                  i_to,
                  i_from
                );
              }
            } else{
              ctrlOnSlideDone(
                $ctrl.children[i_from],
                $ctrl.children[this.index],
                i_from,
                this.index
              );
            }
          }
        }.bind(this));

        // setCtrl();
        if (needToPass && !this.continuous)
          return 'pass';
      },

      clearTimer () {
        clearInterval(this.timer)
        this.timer = null
      },

      transitionendProcessor () {
        var $lis = this.$lis,
          $ul = this.$ul;

        if (this.onEveryPageEnter instanceof Function)
          this.onEveryPageEnter(this.index);

        // if (onEnter[this.index])
        //   onEnter[this.index]();

        requestAnimationFrame(function () {
          // status.liScrocllLocker = false;
          
          if (this.index > $lis.length - 1)
            $lis[0].style['overflow-y'] = 'auto';
          else if (this.index < 0)
            $lis[$lis.length - 1].style['overflow-y'] = 'auto';
          else
            $lis[this.index].style['overflow-y'] = 'auto';

        }.bind(this));

        $ul.removeEventListener('transitionend', this.transitionendProcessor);
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

      ul {
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

      &.loop ul{
        will-change: none;
        transition: none;
        position: relative;

        div {
          will-change: transform;
          transition: all 0.2s ease 0s;
          position: absolute
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
    -webkit-transition: none!important;
    -o-transition: none!important;
    -moz-transition: none!important;
  }

  *::-webkit-scrollbar{
    display: none;
  }
</style>
