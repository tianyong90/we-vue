<template>
  <div id="app">
    <transition
      name="custom-transition"
      enter-active-class="animated fadeIn"
      mode="out-in"
    >
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
