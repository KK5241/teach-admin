<template>
  <div class="main-container">
    <div class="header">
      <div class="bread-crumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="item in breadcrumb"
            :key="item.path"
            :to="item.path"
            >{{ item.name }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div
        class="semester"
        style="display: flex; width: 300px"
        v-if="useInfo.userInfo[0].role !== '301'"
      >
        <span style="margin-right: 10px; width: 120px">当前学期：</span>
        <el-select
          v-model="selectedSemester"
          placeholder="请选择学期"
          style="position: relative; top: -5px"
        >
          <el-option
            v-for="(item, index) in semesters"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <div class="semester" style="display: flex; width: 300px" v-else>
        <span style="margin-right: 10px; width: 120px">当前学期：</span>
        <el-select
          v-model="selectedSemester"
          placeholder="请选择学期"
          style="position: relative; top: -5px"
        >
          <el-option
            v-for="(item, index) in semesters"
            :key="index"
            :label="item"
            :value="item"
            :disabled="item !== selectedSemester"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="comment">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "../../store";
import { getSemester, modifySemester } from "../../api/semester";
import mitt from "mitt";
const semesters = ref(null);
const selectedSemester = ref(null);
const useInfo = useUserStore();

//获取所有学期
onMounted(async () => {
  const result = await getSemester();
  semesters.value = result.data.data.map((item) => item.semesterName);
  result.data.data.forEach((element) => {
    if (element.isCurrent === "是")
      selectedSemester.value = element.semesterName;
  });
});
//添加侦听器 监测改变当前学期
watch(selectedSemester, async (newValue, oldValue) => {
  localStorage.setItem('currentSemester',newValue)
  await modifySemester(newValue, oldValue);
  const result = await getSemester();
  semesters.value = result.data.data.map((item) => item.semesterName);
  result.data.data.forEach((element) => {
    if (element.isCurrent === "是")
      selectedSemester.value = element.semesterName;
  });
  console.log(newValue, oldValue);
});
const route = useRouter();
//路由匹配信息
let breadcrumb = computed(() => {
  return route.currentRoute.value.matched.map((item) => {
    return {
      name: item.meta.name,
      path: item.path,
    };
  });
});
</script>

<style lang="scss" scoped>.main-container {
  padding: 15px 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .semester {
      width: 200px;
    }
  }
}
</style>
