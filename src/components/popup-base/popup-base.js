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
    this.slot.init(this.config, e)
    popUpController.open(this.popUp, this.getRouterId())
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
  }
}

export default popUpBase
