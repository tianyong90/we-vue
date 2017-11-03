<template>
  <transition :name="$root.transitionName">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>
