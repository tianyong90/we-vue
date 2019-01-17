<template>
  <div class="wv-circle" :style="style">
    <svg
      :width="diameter"
      :height="diameter"
      :viewBox="'0 0 ' + diameter + ' ' + diameter"
    >
      <path :d="pathString" :stroke="trailColor" :stroke-width="lineWidth" fill="none" />
      <path
        :d="pathString"
        stroke-linecap="round"
        :stroke="strokeColor"
        :stroke-width="lineWidth"
        :style="pathStyle"
        :fill="fillColor"
      />
      <text
        class="wv-circle-content"
        text-anchor="middle"
        dominant-baseline="middle"
        x="50%"
        y="50%"
      >
        <slot />
      </text>
    </svg>
  </div>
</template>

<script>
import circle from './circle.vue.ts'
export default circle
</script>
