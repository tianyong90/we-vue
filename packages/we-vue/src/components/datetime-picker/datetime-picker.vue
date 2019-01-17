<template>
  <wv-picker
    ref="picker"
    :visible.sync="currentVisible"
    :columns="columns"
    @change="onChange"
    @confirm="onConfirm"
    @cancel="onCancel"
    :confirm-text="confirmText"
    :cancel-text="cancelText"
    :visible-item-count="visibleItemCount"
  />
</template>

<script>
import datetimePicker from './datetime-picker.vue.ts'
export default datetimePicker
</script>
