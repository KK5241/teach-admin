<template>
  <div class="main-container">
    <div class="comment">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.main-container {
  box-sizing: border-box;
  padding: 15px 20px;
  padding-bottom:0;
  height: 100%;
  overflow: hidden;
}
.comment{
  height: 100%;
  box-sizing: border-box;
}
</style>
