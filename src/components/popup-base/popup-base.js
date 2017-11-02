import Vue from 'vue'
import popUpController from '../popup-base/index.js'

let popUpBase = {
  init: function (
    defaultConfig, constructConfig, popUpConfig, instancesMap, template, id
  ) {
    this.constructConfig = Object.assign({}, defaultConfig, constructConfig)
    this.popUpConfig = popUpConfig
    this.instancesMap = instancesMap
    this.constructConfig.id = id
    this.config = this.constructConfig
    this.Factory = Vue.extend(template)
    this.instancesMap[this.getRouterId()] = this
    popUpController.register(this.getRouterId(), this.open.bind(this))
  },

  open: function (e, runtimeConfig) {
    var routerId = this.getRouterId()

    this.config = Object.assign({}, this.constructConfig, runtimeConfig)
    this.config.e = e

    this.vm_popUp = popUpController.createPopUp(this.popUpConfig, routerId, e, this.config)
    this.vm_slot = new this.Factory({
      el: this.vm_popUp.$refs.slot,
      propsData: this.config
    })
    this.vm_popUp.$refs.slot = this.vm_slot.$el
    this.vm_popUp.vm_slot = this.vm_slot // 我觉得我的命名开始凌乱了...
    this.vm_slot._controller = this

    popUpController.open(this.vm_popUp, routerId, () => {
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

  close: function () {
    if (this.vm_popUp.status === 'on') {
      history.back()
    }
  },

  configPosition: function (e) {
    var config = this.config
    var $slot = this.vm_slot.$el
    var $slotContainer = this.vm_popUp.$refs.slotContainer
    var position = config.position

    // 公用
    var fromLeft, fromTop, originX, originY
    var fromFrameLeft, fromFrameTop
    var placeLeftOffset, placeRightOffset, placeBottomOffset, placeTopOffset
    var margins = []
    var frame = {}
    var dWidth = $slot.clientWidth
    var dHeight = $slot.clientHeight
    // clickRelative 需要的
    var clickX, clickY

    // domRelative 需要的
    var $refDom, refRect
    var refCorner, relativeToCorner

    this.vm_popUp.positionType = config.positionType || 'fixed'

    if (config.positionType === 'absolute') {
      $slotContainer.style.marginTop = window.scrollY + 'px'
      $slotContainer.style.marginLeft = window.scrollX + 'px'
    }

    if (position === 'center' || position === undefined) {
      position = {}
    }

    if (position instanceof Object) {
      frame.width = window.innerWidth
      frame.height = window.innerHeight

      var helper = function (one, another) {
        var tmp
        var frameOne = one === 'top' ? frame.height : frame.width
        var dOne = one === 'top' ? dHeight : dWidth

        one = position[one]
        another = position[another]

        if (one !== undefined) {
          // 百分比处理
          if (typeof one === 'string' && one.indexOf('%') !== -1) {
            tmp = parseFloat(one.slice(0, one.indexOf('%'))) * frameOne
          } else if (typeof one === 'string' || typeof one === 'number') {
            tmp = one
          } else {
            console.log('position.top的参数类型不对~')
          }
        } else if (another !== undefined) {
          // 百分比处理
          if (typeof another === 'string' && another.indexOf('%') !== -1) {
            tmp = (1 - parseFloat(another.slice(0, another.indexOf('%')))) * frameOne
          } else if (typeof another === 'string' || typeof another === 'number') {
            tmp = frameOne - parseFloat(another) - dOne
          } else {
            console.log('position.bottom的参数类型不对~')
          }
        } else { // 居中
          tmp = (frameOne - dOne) / 2
        }

        return tmp
      }

      fromTop = helper('top', 'bottom')
      fromLeft = helper('left', 'right')
      $slot.style.marginLeft = fromLeft + 'px'
      $slot.style.marginTop = fromTop + 'px'
    }

    if (position === 'clickRelative') {
      // region 点击坐标初始化
      if (e === undefined) return

      if (e.touches && e.touches[0]) {
        clickX = e.touches[0].clientX
        clickY = e.touches[0].clientY
      } else if (e.clientX) {
        clickX = e.clientX
        clickY = e.clientY
      }

      // endregion
      // region 外框 格式化 TODO 之后可以缓存这个,不过动态也是有好处的, 性能优化的时候在做吧
      if (config.frame instanceof Object) {
        frame.top = config.frame.top
        frame.left = config.frame.left
        frame.width = config.frame.width
        frame.height = config.frame.height
      } else if (config.frame instanceof HTMLElement) {
        var rect = config.frame.getBoundingClientRect()
        frame.top = rect.top
        frame.left = rect.left
        frame.width = rect.width
        frame.height = rect.height
      } else {
        frame.top = 0
        frame.left = 0
        frame.width = window.innerWidth
        frame.height = window.innerHeight
      }
      // endregion

      // region margin 导入
      if (typeof config.margin === 'number' || typeof config.margin === 'string') {
        margins[0] = margins[1] = margins[2] = margins[3] = config.margin
      } else if (config.margin instanceof Array) {
        if (config.margin.length === 2) {
          margins[0] = margins[2] = config.margins[0]
          margins[1] = margins[3] = config.margins[1]
        } else if (config.margin.length === 4) {
          margins[0] = config.margins[0]
          margins[1] = config.margins[1]
          margins[2] = config.margins[2]
          margins[3] = config.margins[3]
        }
      } else {
        margins[0] = margins[1] = margins[2] = margins[3] = 0
      }

      // margin 数值格式化
      var formatValue = function (val, base) {
        if (typeof val === 'string') {
          if (val[val.length - 1] === '%') {
            return parseInt(val.slice(0, val.length - 1)) * base
          } else if (val.indexOf('px') !== -1) {
            return parseInt(val.replace('px', ''))
          }
        } else if (typeof val === 'number') {
          return val
        }
      }
      margins[0] = formatValue(margins[0], frame.height)
      margins[1] = formatValue(margins[1], frame.width)
      margins[2] = formatValue(margins[2], frame.height)
      margins[3] = formatValue(margins[3], frame.width)

      //endregion

      fromFrameLeft = clickX - frame.left
      fromFrameTop = clickY - frame.top

      //region 左右
      //假设放在左右边的情况
      placeLeftOffset = frame.width - fromFrameLeft - dWidth - margins[1]
      placeRightOffset = fromFrameLeft - dWidth - margins[3]

      if (dWidth < frame.width) {
        if (placeLeftOffset < 0) {
          if (placeRightOffset > 0) {
            fromLeft = clickX - dWidth
            originX = 'right'
          } else {
            if (placeLeftOffset > placeRightOffset) {
              fromLeft = clickX + placeLeftOffset
              originX = 'left'
            } else {
              fromLeft = clickX - dWidth - placeRightOffset
              originX = 'left'
            }
          }
        } else {
          // 右边可以嵌入正常
          fromLeft = clickX
          originX = 'left'
        }
      } else {
        // 溢出的情况
        fromLeft = 0
        originX = 'left'
      }
      // endregion

      // region 上下
      // 假设放在上下边的情况
      placeBottomOffset = frame.height - fromFrameTop - dHeight - margins[2]
      placeTopOffset = fromFrameTop - dHeight - margins[0]

      if (dHeight < frame.height) {
        if (placeBottomOffset < 0) {
          if (placeTopOffset > 0) {
            fromTop = clickY - dHeight
            originY = 'bottom'
          } else {
            if (placeBottomOffset > placeTopOffset) {
              fromTop = clickY + placeBottomOffset
              originY = 'top'
            } else {
              fromTop = clickY - dHeight - placeTopOffset
              originY = 'bottom'
            }
          }
        } else {
          // 右边可以嵌入正常
          fromTop = clickY
          originY = 'top'
        }
      } else {
        // 溢出的情况
        fromTop = 0
        originY = 'top'
      }
      // endregion

      $slot.style.position = 'absolute'
      $slot.style.left = fromLeft + 'px'
      $slot.style.top = fromTop + 'px'
    }

    // region
    if (position === 'domRelative' && config.refDom instanceof HTMLElement) {
      $refDom = config.refDom
      refRect = $refDom.getBoundingClientRect()

      //解析参数
      refCorner = this.parseRefCorner(config.refCorner)
      relativeToCorner = this.parseRelativeToCorner(config.relativeToCorner)

      // 设定位置
      fromLeft = refRect.left
      fromTop = refRect.top

      if (refCorner[0] === 'bottom') {
        fromTop += refRect.height
      } else if (refCorner[0] === 'center') {
        fromTop += refRect.height / 2 - dHeight / 2
      }

      if (refCorner[1] === 'right') {
        fromLeft += refRect.width
      } else if (refCorner[1] === 'center') {
        fromLeft += refRect.width / 2 - dWidth / 2
      }

      if (relativeToCorner[0] === 'above' && refCorner[0] !== 'center') {
        fromTop -= dHeight
      }

      if (relativeToCorner[1] === 'before' && refCorner[1] !== 'center') {
        fromLeft -= dWidth
      }

      $slot.style.position = 'absolute'
      $slot.style.left = fromLeft + 'px'
      $slot.style.top = fromTop + 'px'
    }
    // endregion

    // 设置动画重心
    if (config.autoSetOrthocenter === true) {
      $slot.style['transform-origin'] = (originY + ' ' + originX)
    }
  },

  parseRefCorner: function (cRefCorner) {
    // 解析refCorner
    var refCorner
    var validVerticalRefCorner = ['top', 'bottom', 'center']
    var validHorizonalRefCorner = ['left', 'right', 'center']

    if (cRefCorner === undefined) {
      // 缺省默认
      refCorner = ['top', 'right']
    } else if (typeof cRefCorner === 'string') {
      refCorner = cRefCorner.split(' ')
      //检查参数是否合法
      if (
        refCorner.length !== 2 ||
        !validVerticalRefCorner.includes(refCorner[0]) || !validHorizonalRefCorner.includes(refCorner[1])
      ) {
        console.log('refCorner配置有误~')
      }
    } else {
      // 非法参数,或者不可解析的参数
      console.log('refCorner配置有误~')
    }
    return refCorner
  },

  parseRelativeToCorner: function (cRelativeToCorner) {
    // 解析refCorner
    var relativeToCorner
    var validVerticalRelativeToCorner = ['below', 'above']
    var validHorizonalRelativeToCorner = ['before', 'after']

    //解析relativeToCorner
    if (cRelativeToCorner === undefined) {
      // 缺省默认
      relativeToCorner = ['below', 'after']
    } else if (typeof cRelativeToCorner === 'string') {
      relativeToCorner = cRelativeToCorner.split(' ')
      //检查参数是否合法
      if (
        relativeToCorner.length !== 2 ||
        !validVerticalRelativeToCorner.includes(relativeToCorner[0]) || !validHorizonalRelativeToCorner.includes(relativeToCorner[1])
      ) {
        console.log('relativeToCorner配置有误~')
      }
    } else {
      // 非法参数,或者不可解析的参数
      console.log('relativeToCorner配置有误~')
    }
    return relativeToCorner
  }
}

export default popUpBase
