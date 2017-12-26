<template>
  <transition :name="$root.transitionName">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </transition>
</template>
