<template>
  <div class="page">
    <w-group title="switch 支持左右滑动和点击进行开关操作">
      <w-switch-cell title="开关 1" v-model="switchValue1"/>
      <w-switch-cell title="开关 2（禁用）" disabled v-model="switchValue2"/>
    </w-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      switchValue1: true,
      switchValue2: false
    }
  }
}
</script>
