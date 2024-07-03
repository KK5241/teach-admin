<template>
  <div class="circle-detail-container">
    <div class="main">
      <!-- 数据是异步获取过来的 如果不加if则先传过去的是null 导致一系列问题 -->
      <CircleContent :data="circleDetail" v-if="circleDetail"></CircleContent>
    </div>
  </div>
</template>

<script setup>

import CircleContent from "./CircleContent.vue";
import { onMounted, ref } from "vue";
import { getCircleDetail } from "../../api/circle";
import { useRoute } from "vue-router";

const circleDetail = ref(null);
onMounted(async () => {
  const router = useRoute();
  const result = await getCircleDetail(router.params.id)
  circleDetail.value = result.data[0]
  console.log(circleDetail.value);
});
</script>

<style lang="scss" scoped>
.circle-detail-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.main {
  scroll-behavior: smooth;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
