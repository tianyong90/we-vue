<template>
  <div class="wv-swipe">
    <div class="wv-swipe-wrapper" v-swipe:horizonal.lock="swipeConfig">
      <div class="wv-swipe-items" ref="swipeItems">
        <slot></slot>
      </div>
    </div>
    <div class="wv-swipe-indicators" v-show="showIndicators">
      <slot name="indicator"></slot>
    </div>
  </div>
</template>

<script>
  import { once, addClass, removeClass } from '../../utils/dom.js'
  import { swipeDirective } from '../../custom/event/swipe.js'

  export default {
    name: 'wv-swipeplus',

    created () {
      this.info = null
      this.dom = {
        $pages: null,
        $pageContainer: null,
        $indicators: null,
        $indicatorContainer: null,
        itemWidth: null,
        actualSwipeValue: null,
        speedAjustRange: 100
      }
      this.status = {
        initLocker: false,
        rafLocker: false,
        edgeLocker: false,
        swipeCurrentOffset: null,
        swipeStartOffset: null,
        activatedClass: 'is-active',
        swipeStartTime: null
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
        animating: false,
        index: 0,
        timer: null,
        reInitTimer: null,
      }
    },

    props: {
      speed: {
        type: Number,
        default: 280
      },
      defaultIndex: {
        type: Number,
        default: 0
      },
      auto: {
        type: Number,
        default: 0
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
      overflow: {
        type: String,
        default: 'default'
      },
      onSwitch: {
        type: Function,
        default: null
      },
    },

    mounted () {
      this.ready = true

      this.setTimer();
      this.reInitPages();
      window.addEventListener('resize',this.reSize);
    },

    methods: {
      swipeItemCreated () {
        if (!this.ready) return

        clearTimeout(this.reInitTimer)
        this.reInitTimer = setTimeout(() => {
          this.reInitPages()
        }, 0)
      },

      swipeItemDestroyed () {
        if (!this.ready) return

        clearTimeout(this.reInitTimer)
        this.reInitTimer = setTimeout(() => {
          this.reInitPages()
        }, 10)
      },

      reInitPages () {
        var $pageContainer = this.dom.$pageContainer = this.$el.querySelector('.wv-swipe-items'),
            $pages = this.dom.$pages = $pageContainer.children;

        let intDefaultIndex = Math.floor(this.defaultIndex)
        let defaultIndex = (intDefaultIndex >= 0 && intDefaultIndex < $pages.length) ? intDefaultIndex : 0
        this.index = defaultIndex;
        this.dom.$pages = $pages;
        this.dom.$indicatorContainer = this.$el.querySelector('.wv-swipe-indicators');
        this.dom.$indicators = this.dom.$indicatorContainer.children;

        this.reSize();
      },

      reSize (){
        var $pageContainer = this.dom.$pageContainer,
            $swiper =  this.$el.children[0],
            $pages = this.dom.$pages,
            $indicators = this.dom.$indicators,
            index = this.index,
            speed = this.speed,
            continuous = this.continuous,
            gap = this.gap,
            self = this,
            actualSwipeValue, itemWidth;

        itemWidth = this.dom.itemWidth = this.itemWidth || $swiper.clientWidth;
        actualSwipeValue = this.dom.actualSwipeValue = this.dom.itemWidth + gap;
        this.status.swipeStartOffset = index * actualSwipeValue;

        requestAnimationFrame(function () {
          $pageContainer.classList.add('noneAnimation','subNoneAnimation');
          $swiper.classList.add('subNoneAnimation');
          $swiper.style['opacity'] = 0;
          $pages[index].classList.add(self.status.activatedClass);
          $indicators[index] && $indicators[index].classList.add(self.status.activatedClass);
          requestAnimationFrame(function () {
            $pageContainer.style.width = ($pages.length * actualSwipeValue) + 'px';
            Array.prototype.forEach.call($pages, function ($page) {
              $page.style.width = itemWidth + 'px';
              $page.style.marginRight = gap + 'px';
              
            });

            if(continuous){
              $swiper.classList.add('loop');
              Array.prototype.forEach.call($pages, function ($page ,i) {
                $page.currentPosition = i * itemWidth ;
                $page.index = i;
                $page.style.transform = 'translate3d(' + $page.currentPosition + 'px,0,0)';
              });
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

      goTo (page, immediately){
        var fromPage = this.index,
          $pageContainer = this.dom.$pageContainer,
          $pages = this.dom.$pages,
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
            if (!this.continuous && (this.index >= this.dom.$pages.length - 1)) {
              return this.clearTimer()
            }
            if (!this.dragging && !this.animating) {
              this.next()
            }
          }, this.auto)
        }
      },

      onSwipe (info){
        var $pageContainer = this.dom.$pageContainer,
          $pages = this.dom.$pages,
          continuous = this.continuous,
          actualSwipeValue = this.dom.actualSwipeValue,
          handleOverflow = this.handleOverflow,
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

              self.status.swipeStartTime = Date.now();
            }
            if (continuous) {
              Array.prototype.forEach.call($pages,function($li){
                $li.style.transform = 
                  `translate3d(${$li.currentPosition + info.offset}px,0,0)`;
              });
            } else {
              $pageContainer.style.transform = 
                `translate3d(${-offset}px,0,0)`;
            }

            self.indicatorOnSwipe instanceof Function && self.indicatorOnSwipe({
              $form: self.dom.$indicators[i_from],
              $to: self.dom.$indicators[i_to],
              from: i_from,
              to: i_to,
              percentage: Math.abs(info.offset / pageWidth)
            });

            self.status.rafLocker = false;
          });
        }
        if (needPass && !continuous) return handleOverflow(info);
      },

      onSwipeDone (info){
        var $pageContainer = this.dom.$pageContainer,
          $pages = this.dom.$pages,
          itemWidth = this.dom.itemWidth,
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

        if (Math.abs(info.offset) / itemWidth > 0.15 &&
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

        if(i_to === i_from)
          this.animate(i_from, i_to);
        else
          this.animate(i_from, i_to, info);
          
        this.indicatorOnSwipe instanceof Function && this.indicatorOnSwipe({
          $form: self.dom.$indicators[i_from],
          $to: self.dom.$indicators[i_to],
          from: i_from,
          to: i_to
        });
        if (needPass && !continuous) return needPass;
      },

      transitionendProcessor () {
        this.clearTimer();
        this.setTimer();
        this.animating = false;
        this.dom.$pageContainer.removeEventListener('transitionend', this.transitionendProcessor);
      },

      animate (i_from, i_to, info){
        var $pageContainer = this.dom.$pageContainer,
          $pages = this.dom.$pages,
          index = this.index,
          continuous = this.continuous,
          actualSwipeValue = this.dom.actualSwipeValue,
          speed = this.ajustSpeed(info),
          self = this,

          needPass = false,
          maxOffset = ($pages.length - 1) * actualSwipeValue,
          $showing = $pageContainer.querySelector('.is-active');

        $pageContainer.addEventListener('transitionend', self.transitionendProcessor);

        self.status.swipeStartOffset = self.index * actualSwipeValue;
        requestAnimationFrame(function () {
          if(!continuous){
            $pageContainer.classList.remove('noneAnimation');
            $pageContainer.style['transform'] = 
              'translate3d(' + -self.status.swipeStartOffset + 'px,0,0)';
            $pageContainer.style.webkitTransition = 
              `-webkit-transform ${speed}ms ease`;
          }else{
            var _loop = function(reset){
              if (!reset) $pageContainer.classList.remove('subNoneAnimation');

              Array.prototype.forEach.call($pages, function ($li,i) {
                $li.classList.add('noneAnimation');
                $li.currentPosition = 
                  ($li.index - self.index) * actualSwipeValue;
                $li.style.transform = 
                  'translate3d(' + $li.currentPosition + 'px,0,0)';
                $li.style.webkitTransition = 
                  `-webkit-transform ${speed}ms ease`;

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

      handleOverflow (info){
        var type = this.overflow;

        if(type === 'backDrag')
          this.overflowBackDrag(info);

        return true;
      },

      overflowBackDrag (info){
        var x = 288 / 3 / 360,
          speed = this.speed || 280; // 默认为微信的转换比例

        x = - this.status.swipeStartOffset + info.offset * x;

        requestAnimationFrame(() => {
          this.dom.$pageContainer.style.transform = 
            'translate3d(' + x + 'px,0,0)';
          this.dom.$pageContainer.style.webkitTransition = 
            `-webkit-transform ${speed}ms ease`;
        });

        return true;
      },

      updateIndex (val, oVal){
        var max = this.dom.$pages.length - 1;

        if( val >= 0 && val <= max ){
          if(oVal < 0) oVal = max;
          if(oVal > max) oVal = 0;

          this.dom.$pages[val].classList.add(this.status.activatedClass);
          this.dom.$pages[oVal].classList.remove(this.status.activatedClass);

          this.dom.$indicators[val] && this.dom.$indicators[val].classList.add(this.status.activatedClass);
          this.dom.$indicators[oVal] && this.dom.$indicators[oVal].classList.remove(this.status.activatedClass);

          this.dom.$pages[val] && 
            this.dom.$pages[val].__vue__&&
              this.dom.$pages[val].__vue__.onEnter instanceof Function && 
                this.dom.$pages[val].__vue__.onEnter[val]();

          this.dom.$pages[oVal] && 
            this.dom.$pages[oVal].__vue__&&
              this.dom.$pages[oVal].__vue__.onLeave instanceof Function &&
                this.dom.$pages[oVal].__vue__.onLeave[oVal]();

          this.dom.$indicators[val] && 
            this.dom.$indicators[val].__vue__&&
              this.dom.$indicators[val].__vue__.onEnter instanceof Function && 
                this.dom.$indicators[val].__vue__.onEnter[val]();

          this.dom.$indicators[oVal] && 
            this.dom.$indicators[oVal].__vue__&&
              this.dom.$indicators[oVal].__vue__.onLeave instanceof Function &&
                this.dom.$indicators[oVal].__vue__.onLeave[oldVal]();

          this.onSwitch instanceof Function && 
            this.onSwitch(val, oldVal);
        }
      },

      ajustSpeed (info){
        var speed = this.speed || 240,
          swipeTime = Date.now() - this.status.swipeStartTime,
          avgSwipeSpeed , offsetToAnimate , swipeOffset, speedOfAnimate, _speed;

        if(info){
          swipeOffset = Math.abs(info.offset);
          avgSwipeSpeed = swipeOffset / swipeTime;
          offsetToAnimate = this.dom.itemWidth - swipeOffset;
          speedOfAnimate = offsetToAnimate * avgSwipeSpeed;
          
          _speed = offsetToAnimate / (swipeOffset / swipeTime) * 1.2;

          if(_speed > 1.6 * speed)
            _speed = 1.6 * speed;

          if(_speed < 0.5 * speed)
            _speed = 0.5 * speed;
          speed = _speed;
        }
        
        return speed;
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
        this.updateIndex.apply(this, arguments);
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

      .wv-swipe-items {
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

        }
      }

      &.loop .wv-swipe-items{
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
          background-color:#fff; 
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
