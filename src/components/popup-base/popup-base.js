import Vue from 'vue'
import popUpController from '../popup-base/index.js'

let popUpBase = {
  init: function(
    defaultConfig, constructConfig, popUpConfig, instancesMap, template, id
  ){
    this.constructConfig = Object.assign({}, defaultConfig ,constructConfig)
    this.popUpConfig = popUpConfig
    this.instancesMap = instancesMap
    this.constructConfig.id = id
    this.config = this.constructConfig
    this.Factory = Vue.extend(template)
    this.instancesMap[this.getRouterId()] = this
    popUpController.register(this.getRouterId(), this.open.bind(this))
  },
  open: function (e, runtimeConfig) {
    this.config = Object.assign({}, this.constructConfig, runtimeConfig);
    this.popUp = popUpController.createPopUp(this.getRouterId(), this.popUpConfig, e)
    this.slot = new this.Factory({
      el: this.popUp.$refs.slot,
      propsData: {
        config: this.config,
        e: e
      }
    })
    this.popUp.$refs.slot = this.slot.$el
    this.popUp.vm_slot = this.slot //我觉得我的命名开始凌乱了...
    this.slot.$controller = this
    
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

        //公用
        fromLeft, fromTop, originX, originY,
        fromFrameLeft, fromFrameTop,
        placeLeftOffset, placeRightOffset, placeBottomOffset, placeTopOffset,
        margins = [],
        frame = {},
        d_width = $slot.clientWidth,
        d_height = $slot.clientHeight,
        //clickRelative 需要的
        clickX, clickY,
        
        //domRelative 需要的
        $refDom, refRect,
        refCorner, relativeToCorner,
        validVertical_RefCorner = ['top','bottom','center'],
        validHorizonal_RefCorner = ['left','right','center'],
        validVertical_RelativeToCorner = ['below','above'],
        validHorizonal_RelativeToCorner = ['before','after']
        ;

    if (config.position === 'clickRelative') {

      //region 点击坐标初始化
      if(e === undefined) return 

      if(e.touches && e.touches[0]){
        clickX = e.touches[0].clientX,
        clickY = e.touches[0].clientY;
      }else if(e.clientX){
        clickX = e.clientX,
        clickY = e.clientY;
      }
      
      //endregion
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

    //region
    if(config.position === 'domRelative' && config.refDom instanceof HTMLElement) {
      $refDom = config.refDom;
      refRect = $refDom.getBoundingClientRect();
      
      //解析参数

      //解析refCorner

      if(config.refCorner === undefined){
        //缺省默认
        refCorner = ['top', 'right']
      }else if(typeof config.refCorner === 'string'){
        refCorner = config.refCorner.split(' ');
        //检查参数是否合法
        if(
          refCorner.length !== 2 ||
          !validVertical_RefCorner.includes(refCorner[0]) || !validHorizonal_RefCorner.includes(refCorner[1])
        ){
          console.log('refCorner配置有误~')
        }
      }else{
        //非法参数,或者不可解析的参数
        console.log('refCorner配置有误~')
      }

      //解析relativeToCorner
      if(config.relativeToCorner === undefined){
        //缺省默认
        relativeToCorner = ['below', 'after']
      }else if(typeof config.relativeToCorner === 'string'){
        relativeToCorner = config.relativeToCorner.split(' ');
        //检查参数是否合法
        if(
          relativeToCorner.length !== 2 ||
          !validVertical_RelativeToCorner.includes(relativeToCorner[0]) || !validHorizonal_RelativeToCorner.includes(relativeToCorner[1])
        ){
          console.log('relativeToCorner配置有误~')
        }
      }else{
        //非法参数,或者不可解析的参数
        console.log('relativeToCorner配置有误~')
      }

      //设定位置
      fromLeft = refRect.left;
      fromTop = refRect.top;

      if(refCorner[0] === 'bottom')
        fromTop += refRect.height;
      else if(refCorner[0] === 'center')
        fromTop += refRect.height/2 - d_height/2;
      
      if(refCorner[1] === 'right')
        fromLeft += refRect.width;
      else if(refCorner[1] === 'center')
        fromLeft += refRect.width/2 - d_width/2;
      
      if(relativeToCorner[0] === 'above' && refCorner[0] !== 'center')
        fromTop -= d_height;
      
      if(relativeToCorner[1] === 'before' && refCorner[1] !== 'center')
        fromLeft -= d_width;

      $slot.style.position = 'absolute';
      $slot.style.left = fromLeft + 'px';
      $slot.style.top = fromTop + 'px';
    }
    //endregion


    //设置动画重心
    if (config.autoSetOrthocenter === true)
      $slot.style['transform-origin'] = (originY + ' ' + originX);
  },

}

export default popUpBase
