<template>
  <div>
    <transition
      enter-active-class="weui-animate-fade-in"
      leave-active-class="weui-animate-fade-out"
    >
      <div v-show="visible" class="weui-mask" />
    </transition>
    <transition
      enter-active-class="weui-animate-slide-up"
      leave-active-class="weui-animate-slide-down"
    >
      <div v-show="visible" class="weui-picker">
        <div class="weui-picker__hd">
          <div
            class="weui-picker__action"
            @click="onCancel"
            v-text="cancelText"
          />
          <div
            class="weui-picker__action"
            @click="onConfirm"
            v-text="confirmText"
          />
        </div>
        <div class="weui-picker__bd" :style="pickerBodyStyle">
          <picker-column
            v-for="(column, index) in (simple ? [columns] : columns)"
            :key="index"
            :options="simple ? column : column.options"
            :value-key="valueKey"
            :default-index="column.defaultIndex"
            :visible-item-count="visibleItemCount"
            @change="columnValueChange(index)"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import picker from './picker.vue.ts'
export default picker
</script>
