<template>
  <div>
    <div class="page__hd">
      <h1 class="page__title">{{ $route.meta.title }}</h1>
      <p class="page__desc">{{ $route.meta.description }}</p>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
