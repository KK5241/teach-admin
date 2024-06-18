<script setup>
import Layout from './components/Layout/Layout.vue'
import Menu from './components/Menu/MenuItem.vue'
import Login from './components/Login/Login.vue'
</script>

<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<style scoped lang="less">
.app-container {
  width: 100%;
  height: 100%;
}
</style>
