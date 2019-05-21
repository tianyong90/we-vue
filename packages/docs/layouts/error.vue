<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    error: Object
  }
}
</script>

<style></style>
