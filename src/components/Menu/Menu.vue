<template>
    <div class="menu-container">
        <div class="logo">
        <img
          src="https://xiaoban.hebau.edu.cn/__local/A/F1/C3/C5E6614D598EF966D8B1EB13127_B6BAB821_9D78.gif?e=.gif"
          alt=""
          style="width: 40px;height: 40px;"
        />
        <h1>教学文件管理系统</h1>
      </div>
        <MenuItem ></MenuItem>
    </div>
</template>

<script setup>
import MenuItem from './MenuItem.vue'

</script>

<style lang="scss" scoped>
.menu-container {
    height: 100%;
    background:#304156;
    overflow: hidden;
    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
        h1 {
            color: white;
            position: relative;
            margin-left: 10px;
        }
    }
}
</style>