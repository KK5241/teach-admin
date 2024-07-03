<template>
  <div class="home-container">
    <div class="common-layout">
      <el-container>
        <el-aside width="250px" style="height: 100vh;">
          <slot name="menu"></slot>
        </el-aside>
        <el-container >
          <el-header>
            <slot name="header"></slot>
          </el-header>
          <el-main style="padding-bottom: 0;height: 300px;;">
            <slot name="main"></slot>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.layout-container {
  box-sizing: border-box;
  .left { 
    width: 200px;
    height: 100vh;
  }
}
.el-header {
  padding: 0;
}
</style>