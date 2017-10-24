<template>
  <wv-cell :title="title" v-if="isInCell">
    <div class="wv-switch" :class="{ 'wv-switch-on': currentValue, 'wv-switch-disabled': disabled }" @click="onClick" slot="ft">
      <div class="background"></div>
      <div class="thumb" @touchstart="onTouchstart" @touchmove="onTouchmove" @touchend="onTouchend" ref="thumb"></div>
    </div>
  </wv-cell>

  <div class="wv-switch" :class="{ 'wv-switch-on': currentValue, 'wv-switch-disabled': disabled }" @click="onClick" ref="root" v-else>
    <div class="background"></div>
    <div class="thumb" @touchstart="onTouchstart" @touchmove="onTouchmove" @touchend="onTouchend" ref="thumb"></div>
  </div>
</template>

<script>
  import Cell from '../cell/index'
  import Transform from 'css3transform'
  const THUMB_STROKE = 20 // 开关的行程

  export default {
    name: 'wv-switch',

    components: {
      'wv-cell': Cell
    },

    props: {
      title: String,
      disabled: Boolean,
      isInCell: {
        type: Boolean,
        default: true
      },
      value: Boolean
    },

    data() {
      return {
        currentValue: this.value,
        dragState: {},
        idDragging: false
      }
    },

    mounted() {
      this.isDragging = false
      const thumb = this.$refs.thumb
      Transform(thumb, true)
      if (this.currentValue) {
        thumb.translateX = THUMB_STROKE
      }
    },

    methods: {
      onClick(event) {
        event.preventDefault()
        if (this.disabled) return

        this.currentValue = !this.currentValue
      },

      onTouchstart(event) {
        event.preventDefault()
        if (this.disabled || this.isDragging) return

        const thumb = this.$refs.thumb

        this.dragState.startPositionX = event.changedTouches[0].clientX

        this.dragState.startTranslateX = thumb.translateX
        this.dragState.startTimestamp = new Date()

        thumb.style.transition = ''
      },

      onTouchmove(event) {
        event.preventDefault()
        if (this.disabled || this.isDragging) return

        this.idDragging = false

        let deltaX = event.changedTouches[0].clientX - this.dragState.startPositionX

        const thumb = this.$refs.thumb

        const targetTranslateX = this.dragState.startTranslateX + deltaX

        if (targetTranslateX >= 0 && targetTranslateX <= THUMB_STROKE) {
          thumb.translateX = targetTranslateX
        } else if (targetTranslateX < 0) {
          thumb.translateX = 0
        } else if (targetTranslateX > THUMB_STROKE) {
          thumb.translateX = THUMB_STROKE
        }
      },

      onTouchend(event) {
        event.preventDefault()
        if (this.disabled || this.isDragging) return

        const touchDuration = (new Date()) - this.dragState.startTimestamp

        if (touchDuration < 500) {
          // 500ms 以内当作点击
          this.currentValue = !this.currentValue
          return
        }

        let deltaX = event.changedTouches[0].clientX - this.dragState.startPositionX

        const thumb = this.$refs.thumb
        thumb.style.transition = '-webkit-transform .35s cubic-bezier(0.4, 0.4, 0.25, 1.35)'
        if (this.currentValue) {
          if (deltaX < THUMB_STROKE / -2) {
            thumb.translateX = 0
            this.currentValue = false
          } else {
            thumb.translateX = THUMB_STROKE
          }
        } else {
          if (deltaX > THUMB_STROKE / 2) {
            thumb.translateX = THUMB_STROKE
            this.currentValue = true
          } else {
            thumb.translateX = 0
          }
        }
      }
    },

    watch: {
      value(val) {
        this.currentValue = val
      },

      currentValue(val) {
        this.$emit('input', val)
        this.$emit('change', val)

        const thumb = this.$refs.thumb
        if (val) {
          thumb.translateX = THUMB_STROKE
        } else {
          thumb.translateX = 0
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  $wv-switch-height: 32px;

  .wv-switch {
    position: relative;
    width: 52px;
    height: $wv-switch-height;
    border: 1px solid #DFDFDF;
    outline: 0;
    border-radius: 16px;
    box-sizing: border-box;
    background-color: #DFDFDF;
    transition: background-color .1s, border .1s;

    input {
      display: none;
    }

    .background {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: 50px;
      height: $wv-switch-height - 2;
      border-radius: 15px;
      background-color: #FDFDFD;
      transition: transform .35s cubic-bezier(0.45, 1, 0.4, 1);
    }

    .thumb {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: $wv-switch-height - 2;
      height: $wv-switch-height - 2;
      border-radius: 15px;
      background-color: #FFFFFF;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
      /*transition: transform .35s cubic-bezier(0.4, 0.4, 0.25, 1.35);*/
    }
  }

  .wv-switch.wv-switch-on {
    border-color: #04BE02;
    background-color: #04BE02;

    .background {
      transform: scale(0);
    }

    .thumb {
      transform: translateX(20px);
    }
  }

  // 兼容IE Edge的版本
  .wv-switch-cp__input {
    position: absolute;
    left: -9999px;
  }

  .wv-switch-cp__box {
    display: block;
  }
</style>
