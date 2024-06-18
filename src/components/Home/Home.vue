<template>
  <Layout>
    <template #menu>
      <Menu></Menu>
    </template>
    <template #header>
      <Header></Header>
    </template>
    <template #main>
        <Main ></Main>
    </template>
  </Layout>
</template>

<script setup>

import Layout from "../Layout/Layout.vue";
import Menu from "../Menu/Menu.vue";
import Main from "../Main/Main.vue";
import Header from "../Header/Header.vue";
import router from "../../router/router";
console.log();
</script>

<style lang="scss" scoped>
</style>