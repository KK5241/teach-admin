<template>
    <div class="menu-container">
        <div class="logo">
        <img
          src="https://zhengxin-pub.cdn.bcebos.com/mark/4b47d105d2c090b70b7617f2c0c26c7b.jpg"
          alt=""
          style="width: 40px;height: 40px;"
        />
        <h1>“ 咱村那点事 ”</h1>
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