<template>
  <div class="page">
    <w-grid>
      <w-grid-item
        v-for="type in iconTypes"
        :key="type"
      >
        <w-icon
          :type="type"
          :large="false"
          slot="icon"
        />
        <span slot="label" v-text="type"/>
      </w-grid-item>
    </w-grid>
  </div>
</template>

<script>
export default {
  data () {
    return {
      iconTypes: [
        'success',
        'info',
        'warn',
        'waiting',
        'success-no-circle',
        'circle',
        'info-circle',
        'download',
        'cancel',
        'search',
      ],
    }
  },
}
</script>
