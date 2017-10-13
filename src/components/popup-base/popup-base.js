import popUpController from '../popup-base/index.js'

let popUpBase = {
  open: function (e) {
    this.popUp = popUpController.createPopUp(this.getRouterId())
    this.slot = new this.Factory({
      el: this.popUp.$refs.slot
    })
    this.popUp.$refs.slot = this.slot.$el
    this.popUp.vm_slot = this.slot //我觉得我的命名开始凌乱了...
    this.slot.$controller = this
    
    this.popUp.init(this.popUpConfig)
    this.slot.init(this.config)
    
    popUpController.open(this.popUp, this.getRouterId(), ()=>{
      this.configPosition(e)
    })
  },

  getRouterId: function () {
    if (this.config.name === undefined && !this.instancesMap.hasOwnProperty(name)) {
      return this.constructor.name + '_' + this.config.id
    } else if (typeof this.config.name === 'string' && this.config.name !== '') {
      return this.config.name
    } else {
      console.log('出现不合法的routerId~')
      return null
    }
  },

  enter: function () {
    this.popUp.enter();
    this.slot.enter();
  },

  close: function(){
    if(this.popUp.status === 'on')
      history.back()
  },

  configPosition: function(e){
    var config = this.config,
        $slot = this.slot.$el,
        fromLeft, fromTop, originX, originY,
        fromFrameLeft, fromFrameTop,
        placeLeftOffset, placeRightOffset, placeBottomOffset, placeTopOffset,
        margins = [],
        frame = {},
        d_width, d_height,
        clickX, clickY;

    if (config.position === 'clickRelative') {

      //region 点击坐标初始化
      if(e.touches){
        clickX = e.touches[0].clientX,
        clickY = e.touches[0].clientY;
      }else{
        clickX = e.clientX,
        clickY = e.clientY;
      }
      //endregion
      
      //region 初始化

      //先弄fixed的版本
      d_width = $slot.clientWidth;
      d_height = $slot.clientHeight;

      //region 外框 格式化 TODO 之后可以缓存这个,不过动态也是有好处的, 性能优化的时候在做吧
      if(config.frame instanceof Object){
        frame.top = config.frame.top
        frame.left = config.frame.left
        frame.width = config.frame.width
        frame.height = config.frame.height
      }else if(config.frame instanceof HTMLElement){
        var rect = config.frame.getBoundingClientRect()
        frame.top = rect.top
        frame.left = rect.left
        frame.width = rect.width
        frame.height = rect.height
      }else{
        frame.top = 0
        frame.left = 0
        frame.width = window.innerWidth
        frame.height = window.innerHeight
      }
      //endregion 

      //工具函数
      //坐标系,不过感觉不会用...名字太长了,就是一个减法
      function coordinateFromFrame (x,y){
        return {
          x: x - frame.left,
          y: y - frame.top
        }
      }

      //region margin 导入
      if(typeof config.margin === 'number' || typeof config.margin === 'string'){
        margins[0] = margins[1] = margins[2] = margins[3] = config.margin;
      }else if(config.margin instanceof Array){
        if(config.margin.length === 2){
          margins[0] = margins[2] = config.margins[0]
          margins[1] = margins[3] = config.margins[1]
        }else if( config.margin.length === 4){
          margins[0] = config.margins[0]
          margins[1] = config.margins[1]
          margins[2] = config.margins[2]
          margins[3] = config.margins[3]
        }
      }else{
        margins[0] = margins[1] = margins[2] = margins[3] = 0;
      }

      //margin 数值格式化
      function formatValue (val, base) {
        if(typeof val === 'string'){
          if( val[val.length-1] === '%'){
            return parseInt(val.slice(0,val.length-1)) * base
          }else if(val.indexOf('px') !== -1){
            return parseInt(val.replace('px',''));
          }
        }else if(typeof val === 'number'){
          return val;
        }
      }
      margins[0] = formatValue(margins[0], frame.height);
      margins[1] = formatValue(margins[1], frame.width);
      margins[2] = formatValue(margins[2], frame.height);
      margins[3] = formatValue(margins[3], frame.width);

      //endregion

      fromFrameLeft = clickX - frame.left;
      fromFrameTop = clickY - frame.top;

      //region 左右
      //假设放在左右边的情况
      placeLeftOffset = frame.width - fromFrameLeft - d_width - margins[1];
      placeRightOffset = fromFrameLeft - d_width - margins[3];

      if(d_width < frame.width){
        if(placeLeftOffset < 0){
          if(placeRightOffset > 0){
            fromLeft = clickX - d_width
            originX = 'right'
          }else{
            if(placeLeftOffset > placeRightOffset){
              fromLeft = clickX + placeLeftOffset;
              originX = 'left'
            }else{
              fromLeft = clickX - d_width - placeRightOffset;
              originX = 'left'
            }
          }
        }else{
          //右边可以嵌入正常
          fromLeft = clickX
          originX = 'left'
        }
      }else{
        //溢出的情况
        fromLeft = 0
        originX = 'left'
      }
      //endregion

      //region 上下
      //假设放在上下边的情况
      placeBottomOffset = frame.height - fromFrameTop - d_height - margins[2];
      placeTopOffset = fromFrameTop - d_height - margins[0];

      if(d_height < frame.height){
        if(placeBottomOffset < 0){
          if(placeTopOffset > 0){
            fromTop = clickY - d_height
            originY = 'bottom'
          }else{
            if(placeBottomOffset > placeTopOffset){
              fromTop = clickY + placeBottomOffset;
              originY = 'top'
            }else{
              fromTop = clickY - d_height - placeTopOffset;
              originY = 'bottom'
            }
          }
        }else{
          //右边可以嵌入正常
          fromTop = clickY
          originY = 'top'
        }
      }else{
        //溢出的情况
        fromTop = 0
        originY = 'top'
      }
      //endregion

      $slot.style.position = 'absolute';
      $slot.style.left = fromLeft + 'px';
      $slot.style.top = fromTop + 'px';
    }

    //设置动画重心
    if (config.autoSetOrthocenter === true)
      $slot.style['transform-origin'] = (originY + ' ' + originX);
  },

}

export default popUpBase
