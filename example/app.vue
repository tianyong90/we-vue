<template>
  <div>
    <!--<div class="page__hd">-->
      <!--<h1 class="page__title">{{ $route.meta.title }}</h1>-->
      <!--<p class="page__desc">{{ $route.meta.description }}</p>-->
    <!--</div>-->
    <transition :name="$root.transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
