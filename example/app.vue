<template>
  <div id="app">
    <transition :name="$root.transitionName">
      <router-view/>
    </transition>
  </div>
</template>
