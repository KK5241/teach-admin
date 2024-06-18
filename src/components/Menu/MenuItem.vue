<template>
  <el-col>
    <!-- 默认激活样式对应标题的index属性 -->
    <el-menu
      active-text-color="#ffd04b"
      background-color="#304156"
      class="el-menu-vertical-demo"
      :default-active="currentIndex"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
      style="border-right: 0px"
      unique-opened
      router
    >
      <el-menu-item v-for="item in menu" :key="item.path" :index="item.path" @click="handleclick(item.path)" >
        <el-icon><icon-menu /></el-icon>
        <span>{{item.title}}</span>
      </el-menu-item>
     
    </el-menu>
  </el-col>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useUserStore } from "../../store";
let {userInfo} = useUserStore()

console.log(userInfo);

const menu = userInfo.map((item)=>{
  return {
    path:item['roleAlias.menus.path'],
    title:item['roleAlias.menus.menuName'],
    icon:'222'
  }
})

console.log(menu);
//取出当前存储的路由地址，根据路由地址匹配index来进行激活样式
const currentIndex = localStorage.getItem('index')
//点击后将此时的路由地址记录到localStorage中，后面刷新后可以直接从这里面取
function handleclick(path){
  localStorage.setItem('index',path)
}
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="less" scoped>
.submenu {
  &:hover {
    background-color: white;
  }
}
</style>