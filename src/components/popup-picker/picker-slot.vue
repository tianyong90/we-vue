<template>
  <div class="weui-picker__group" v-if="!divider">
    <div class="weui-picker__mask"></div>
    <div class="weui-picker__indicator" ref="indicator"></div>
    <div class="weui-picker__content" ref="listWrapper">
      <div class="weui-picker__item" :class="{ 'weui-picker__item_disabled': typeof item === 'object' && item['disabled'] }" v-for="(item, key, index) in mutatingValues" :key="key">{{ typeof item === 'object' && item[valueKey] ? item[valueKey] : item }}</div>
    </div>
  </div>
  <div class="wv-picker-slot-divider" v-else v-html="content"></div>
</template>

<script>
  import draggable from '../../utils/draggable.js'
  import Transform from 'css3transform'
  import emitter from '../../mixins/emitter'

  // 每个选项高度
  const ITEM_HEIGHT = 34
  // 可见选项个数
  const VISIBLE_ITEM_COUNT = 7

  export default {
    name: 'wv-picker-slot',

    mixins: [emitter],

    props: {
      values: {
        type: Array,
        default () {
          return []
        }
      },
      value: {},
      valueKey: String,
      defaultIndex: {
        type: Number,
        default: 0
      },
      divider: {
        type: Boolean,
        default: false
      },
      content: {}
    },

    created () {
      this.dragState = {}
    },

    data () {
      return {
        isDragging: false,
        currentValue: this.value,
        mutatingValues: this.values
      }
    },

    computed: {
      minTranslateY () {
        return ITEM_HEIGHT * (Math.ceil(VISIBLE_ITEM_COUNT / 2) - this.mutatingValues.length)
      },

      maxTranslateY () {
        return ITEM_HEIGHT * Math.floor(VISIBLE_ITEM_COUNT / 2)
      },

      valueIndex () {
        return this.mutatingValues.indexOf(this.currentValue)
      }
    },

    mounted () {
      this.ready = true
      this.currentValue = this.value
      this.$emit('input', this.currentValue)

      if (this.divider) return

      const wrapper = this.$refs.listWrapper
      const $indicator = this.$refs.indicator
      Transform(wrapper, true)

      this.doOnValueChange()

      draggable(this.$el, {
        start: (event) => {
          this.isDragging = true
          let dragState = this.dragState

          dragState.start = new Date()
          dragState.startPositionY = event.clientY
          dragState.startTranslateY = wrapper.translateY

          wrapper.style.transition = null
        },
        drag: (event) => {
          let dragState = this.dragState
          const deltaY = event.clientY - dragState.startPositionY

          wrapper.translateY = dragState.startTranslateY + deltaY
          dragState.currentPosifionY = event.clientY
          dragState.currentTranslateY = wrapper.translateY
          dragState.velocityTranslate = dragState.currentTranslateY - dragState.prevTranslateY

          dragState.prevTranslateY = dragState.currentTranslateY
        },
        end: (event) => {
          this.isDragging = false

          let dragState = this.dragState
          let momentumRatio = 7
          let currentTranslate = wrapper.translateY
          let duration = new Date() - dragState.start
          let distance = dragState.startTranslateY - currentTranslate

          let rect, offset
          if(distance === 0){
            rect = $indicator.getBoundingClientRect()
            offset = Math.floor((event.clientY - rect.top)/ITEM_HEIGHT) * ITEM_HEIGHT
            
            if(offset < this.minTranslateY )
              offset = this.minTranslateY
            
            if(offset > this.maxTranslateY )
              offset = this.maxTranslateY

            dragState.velocityTranslate = 0
            currentTranslate -= offset
            // console.log(event, rect)
            console.log(currentTranslate)
            
          }

          let momentumTranslate
          if (duration < 300) {
            momentumTranslate = currentTranslate + dragState.velocityTranslate * momentumRatio
          }

          wrapper.style.transition = 'all 200ms ease'

          this.$nextTick(() => {
            let translate
            if (momentumTranslate) {
              translate = Math.round(momentumTranslate / ITEM_HEIGHT) * ITEM_HEIGHT
            } else {
              translate = Math.round(currentTranslate / ITEM_HEIGHT) * ITEM_HEIGHT
            }

            translate = Math.max(Math.min(translate, this.maxTranslateY), this.minTranslateY)

            wrapper.translateY = translate
            this.currentValue = this.translate2value(translate)
          })
          this.dragState = {}
        }
      })
    },

    methods: {
      value2translate (value) {
        const values = this.mutatingValues
        const valueIndex = values.indexOf(value)
        const offset = Math.floor(VISIBLE_ITEM_COUNT / 2)

        if (valueIndex !== -1) {
          return (valueIndex - offset) * -ITEM_HEIGHT
        }
      },

      translate2value (translate) {
        translate = Math.round(translate / ITEM_HEIGHT) * ITEM_HEIGHT
        const index = -(translate - Math.floor(VISIBLE_ITEM_COUNT / 2) * ITEM_HEIGHT) / ITEM_HEIGHT

        return this.mutatingValues[index]
      },

      doOnValueChange () {
        let value = this.currentValue
        let wrapper = this.$refs.listWrapper

        if (this.divider) return

        wrapper.translateY = this.value2translate(value)
      }
    },

    watch: {
      values (val) {
        this.mutatingValues = val
      },

      mutatingValues (val) {
        if (this.valueIndex === -1) {
          this.currentValue = (val || [])[0]
        }
      },

      currentValue (val) {
        this.doOnValueChange()
        this.$emit('input', val)
        this.dispatch('wv-picker', 'slotValueChange', this)
      }
    }
  }
</script>

<style scoped lang="scss">
  .weui-picker__group{
    z-index: 0;
    overflow: hidden;
  }
  .weui-picker__mask{
    z-index: 2;
  }
  .weui-picker__indicator{
    z-index: 3;
  }
  .weui-picker__content{
    z-index: 1;
  }

  .wv-picker-slot-divider {
    transform:translateY(106px);
  }
</style>
