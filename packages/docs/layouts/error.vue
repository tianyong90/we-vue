<template>
  <div class="container">
    <div class="error-code">{{ error.statusCode }}</div>
  </div>
</template>

<script>
export default {
  props: {
    error: Object,
  },
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.error-code {
  font-size: 10rem;
  color: #999;
}
</style>
